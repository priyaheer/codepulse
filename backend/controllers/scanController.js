import { Scan } from '../models/Scan.js';
import { Issue } from '../models/Issue.js';
import { Project } from '../models/Project.js';
import { AppError } from '../middleware/errorHandler.js';
import { scanRepository } from '../scanners/repositoryScanner.js';
import { scanCodeQuality } from '../scanners/codeQualityScanner.js';
import { scanSecurity } from '../scanners/securityScanner.js';
import { scanDependencies } from '../scanners/dependencyScanner.js';
import { scanPerformance } from '../scanners/performanceScanner.js';
import { scanArchitecture } from '../scanners/architectureScanner.js';
import { normalizeFindings } from '../scanners/issueNormalizer.js';
import { calculateHealthScore } from '../scanners/healthScoreCalculator.js';

export async function startProjectScan(req, res, next) {
  let scan;
  try {
    const project = await Project.findOne({ _id: req.params.id, userId: req.user._id });
    if (!project) {
      throw new AppError('Project not found', 404);
    }

    scan = await Scan.create({
      projectId: project._id,
      status: 'running',
      startedAt: new Date(),
      branch: project.defaultBranch || 'main',
      progress: { repository: 'running', codeQuality: 'pending', security: 'pending', dependencies: 'pending', performance: 'pending', architecture: 'pending' },
    });

    const repository = await scanRepository({
      userId: req.user._id,
      owner: project.owner,
      repository: project.name,
      branch: project.defaultBranch,
    });
    scan.commitSha = repository.commitSha;
    scan.branch = repository.branch;
    scan.progress.set('repository', 'done');

    const findings = [];
    const scannerErrors = [];
    const runScanner = async (name, scanner, args = repository.files) => {
      scan.progress.set(name, 'running');
      try {
        const result = await scanner(args);
        const scannerFindings = Array.isArray(result) ? result : result.findings;
        findings.push(...normalizeFindings(scannerFindings, name));
        scan.progress.set(name, 'done');
        return result;
      } catch (error) {
        scan.progress.set(name, 'failed');
        scannerErrors.push(`${name}: ${error.message}`);
        return null;
      }
    };

    await runScanner('codeQuality', scanCodeQuality);
    await runScanner('security', scanSecurity);
    const dependencyResult = await runScanner('dependencies', scanDependencies);
    await runScanner('performance', scanPerformance);
    const architectureResult = await runScanner('architecture', scanArchitecture);

    const score = calculateHealthScore(findings);
    scan.status = 'completed';
    scan.completedAt = new Date();
    scan.healthScore = score.healthScore;
    scan.scores = score.scores;
    scan.issueCounts = score.issueCounts;
    scan.architectureSummary = architectureResult?.summary || null;
    scan.error = scannerErrors.length ? scannerErrors.join('; ') : null;
    await scan.save();

    if (findings.length) {
      await Issue.insertMany(findings.map((finding) => ({ ...finding, scanId: scan._id, projectId: project._id })));
    }
    project.latestHealthScore = scan.healthScore;
    project.latestScanId = scan._id;
    project.lastScannedAt = scan.completedAt;
    await project.save();

    res.status(200).json({ data: { scan, dependencySummary: dependencyResult?.summary || null, filesScanned: repository.files.length, repository: repository.metadata } });
  } catch (err) {
    if (scan) {
      scan.status = 'failed';
      scan.completedAt = new Date();
      scan.error = err.message;
      await scan.save().catch(() => {});
    }
    next(err);
  }
}

export async function listProjectScans(req, res, next) {
  try {
    const project = await Project.findOne({ _id: req.params.id, userId: req.user._id });
    if (!project) throw new AppError('Project not found', 404);
    const scans = await Scan.find({ projectId: project._id }).sort({ createdAt: -1 });
    res.json({ data: scans });
  } catch (err) {
    next(err);
  }
}

export async function getProjectScan(req, res, next) {
  try {
    const project = await Project.findOne({ _id: req.params.id, userId: req.user._id });
    if (!project) throw new AppError('Project not found', 404);
    const scan = await Scan.findOne({ _id: req.params.scanId, projectId: project._id });
    if (!scan) {
      throw new AppError('Scan not found', 404);
    }
    res.json({ data: scan });
  } catch (err) {
    next(err);
  }
}
