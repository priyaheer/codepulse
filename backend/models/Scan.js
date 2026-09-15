import mongoose from 'mongoose';

const scanSchema = new mongoose.Schema(
  {
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true, index: true },
    status: {
      type: String,
      enum: ['queued', 'running', 'completed', 'failed'],
      default: 'queued',
      index: true,
    },
    commitSha: { type: String, default: '' },
    branch: { type: String, default: 'main' },

    // Overall health score 0–100
    healthScore: { type: Number, default: null },

    // Per-dimension scores 0–100
    scores: {
      codeQuality: { type: Number, default: null },
      security: { type: Number, default: null },
      performance: { type: Number, default: null },
      maintainability: { type: Number, default: null },
      dependencies: { type: Number, default: null },
    },

    // Issue count breakdown
    issueCounts: {
      total: { type: Number, default: 0 },
      critical: { type: Number, default: 0 },
      high: { type: Number, default: 0 },
      medium: { type: Number, default: 0 },
      low: { type: Number, default: 0 },
    },

    // Progress tracking: each key is a scanner name
    progress: {
      type: Map,
      of: String,  // 'pending' | 'running' | 'done' | 'failed'
      default: {},
    },

    // Architecture summary stored on the scan for quick retrieval
    architectureSummary: { type: Object, default: null },

    startedAt: { type: Date, default: null },
    completedAt: { type: Date, default: null },
    error: { type: String, default: null },
  },
  { timestamps: true }
);

scanSchema.index({ projectId: 1, createdAt: -1 });

export const Scan = mongoose.model('Scan', scanSchema);
