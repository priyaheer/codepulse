import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    githubId: { type: String, required: true, unique: true, index: true },
    username: { type: String, required: true },
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    avatarUrl: { type: String, default: '' },
    githubProfileUrl: { type: String, default: '' },
    publicRepos: { type: Number, default: 0 },
    followers: { type: Number, default: 0 },
    following: { type: Number, default: 0 },
    // Token stored encrypted in production; keep server-side only, never returned in API
    githubAccessToken: { type: String, select: false },
    aiProviderPreference: { type: String, enum: ['gemini', 'openai'], default: 'gemini' },
    isDemo: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
