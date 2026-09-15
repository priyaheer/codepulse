import { Project } from '../models/Project.js';
import { AppError } from '../middleware/errorHandler.js';
import mongoose from 'mongoose';
import { getRepo } from '../services/githubService.js';

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
    const { name, owner, repository, description, language, githubRepoId, defaultBranch, isPrivate, stars } = req.body;
    const repoName = repository || name;
    const repo = await getRepo(req.user._id, owner, repoName);

    const existing = await Project.findOne({ userId: req.user._id, name: repo.name, owner: repo.owner });
    if (existing) {
      return res.status(200).json({ data: existing });
    }

    const project = await Project.create({
      userId: req.user._id,
      name,
      owner,
      githubRepoId: githubRepoId || repo.id,
      name: repo.name,
      owner: repo.owner,
      fullName: repo.fullName,
      defaultBranch: defaultBranch || repo.defaultBranch || 'main',
      description: description ?? repo.description,
      language: language ?? repo.language,
      isPrivate: isPrivate ?? repo.isPrivate,
      stars: stars ?? repo.stars,
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
    if (!mongoose.isValidObjectId(req.params.id)) throw new AppError('Project not found', 404);
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
    if (!mongoose.isValidObjectId(req.params.id)) throw new AppError('Project not found', 404);
    const deleted = await Project.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!deleted) {
      throw new AppError('Project not found', 404);
    }
    res.json({ message: 'Project deleted' });
  } catch (err) {
    next(err);
  }
}
