import { Project } from '../models/Project.js';
import { AppError } from '../middleware/errorHandler.js';

export async function listProjects(req, res, next) {
  try {
    const projects = await Project.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ data: projects });
  } catch (err) {
    next(err);
  }
}

export async function createProject(req, res, next) {
  try {
    const { name, owner, repository, description, language } = req.body;

    const existing = await Project.findOne({ userId: req.user._id, name, owner });
    if (existing) {
      return res.status(200).json({ data: existing });
    }

    const project = await Project.create({
      userId: req.user._id,
      name,
      owner,
      fullName: `${owner}/${name}`,
      description: description || '',
      language: language || '',
      latestHealthScore: 0,
      lastScannedAt: null,
    });

    res.status(201).json({ data: project });
  } catch (err) {
    next(err);
  }
}

export async function getProject(req, res, next) {
  try {
    const project = await Project.findOne({ _id: req.params.id, userId: req.user._id });
    if (!project) {
      throw new AppError('Project not found', 404);
    }
    res.json({ data: project });
  } catch (err) {
    next(err);
  }
}

export async function deleteProject(req, res, next) {
  try {
    const deleted = await Project.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!deleted) {
      throw new AppError('Project not found', 404);
    }
    res.json({ message: 'Project deleted' });
  } catch (err) {
    next(err);
  }
}
