import mongoose from 'mongoose';

const aiSuggestionSchema = new mongoose.Schema(
  {
    issueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue', required: true, index: true },

    // Structured fields — AI must return JSON matching this shape
    summary: { type: String, default: '' },
    whyItMatters: { type: String, default: '' },
    impact: { type: String, enum: ['critical', 'high', 'medium', 'low'], default: 'medium' },
    recommendation: { type: String, default: '' },
    suggestedCode: { type: String, default: '' },
    diff: { type: String, default: '' },
    riskLevel: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
    confidence: { type: Number, min: 0, max: 1, default: 0.7 },

    // Which AI provider generated this
    provider: { type: String, default: 'gemini' },

    // Whether the AI call succeeded; false = fallback/partial content
    aiAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const AISuggestion = mongoose.model('AISuggestion', aiSuggestionSchema);
