import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    githubRepoId: { type: Number },
    owner: { type: String, required: true },
    name: { type: String, required: true },
    fullName: { type: String },          // owner/name
    defaultBranch: { type: String, default: 'main' },
    description: { type: String, default: '' },
    language: { type: String, default: '' },
    isPrivate: { type: Boolean, default: false },
    stars: { type: Number, default: 0 },
    isDemo: { type: Boolean, default: false },
    enabledAnalyses: {
      codeQuality: { type: Boolean, default: true },
      security: { type: Boolean, default: true },
      dependencies: { type: Boolean, default: true },
      performance: { type: Boolean, default: true },
      architecture: { type: Boolean, default: true },
    },
    latestHealthScore: { type: Number, default: null },
    latestScanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Scan', default: null },
    lastScannedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

projectSchema.index({ userId: 1, createdAt: -1 });

export const Project = mongoose.model('Project', projectSchema);
