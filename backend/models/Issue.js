import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema(
  {
    scanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Scan', required: true, index: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true, index: true },

    // Provenance — important for UI trust labels
    source: {
      type: String,
      enum: ['eslint', 'npm-audit', 'secret-scanner', 'dependency-scanner', 'performance-scanner', 'architecture-scanner', 'custom-rule', 'ai'],
      required: true,
    },
    detectionType: {
      type: String,
      enum: ['detected', 'potential', 'ai-insight'],
      default: 'detected',
    },

    category: {
      type: String,
      enum: ['code-quality', 'security', 'performance', 'dependency', 'architecture'],
      required: true,
    },
    severity: {
      type: String,
      enum: ['critical', 'high', 'medium', 'low'],
      required: true,
    },

    title: { type: String, required: true },
    description: { type: String, default: '' },
    file: { type: String, default: '' },
    line: { type: Number, default: null },
    column: { type: Number, default: null },
    rule: { type: String, default: '' },

    // The raw code snippet or data that triggered the finding (never a full secret)
    evidence: { type: String, default: '' },

    status: {
      type: String,
      enum: ['open', 'in_progress', 'resolved', 'ignored'],
      default: 'open',
      index: true,
    },

    // Populated on demand when user requests AI analysis
    aiAnalysisId: { type: mongoose.Schema.Types.ObjectId, ref: 'AISuggestion', default: null },
  },
  { timestamps: true }
);

issueSchema.index({ projectId: 1, status: 1, severity: 1 });
issueSchema.index({ scanId: 1, severity: 1 });

export const Issue = mongoose.model('Issue', issueSchema);
