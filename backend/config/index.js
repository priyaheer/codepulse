import 'dotenv/config';

function required(name) {
  const val = process.env[name];
  if (!val) {
    console.warn(`[config] WARNING: environment variable ${name} is not set`);
  }
  return val || '';
}

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  isDev: process.env.NODE_ENV !== 'production',

  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/codepulse',

  jwtSecret: process.env.JWT_SECRET || 'codepulse-dev-secret-change-in-production',
  tokenEncryptionKey: process.env.TOKEN_ENCRYPTION_KEY || process.env.JWT_SECRET || 'codepulse-token-encryption-dev-key',
  jwtExpiresIn: '7d',

  session: {
    secret: process.env.SESSION_SECRET || 'codepulse-session-secret',
    cookieName: 'cp_session',
  },

  github: {
    clientId: process.env.GITHUB_CLIENT_ID || 'demo-github-client-id',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || 'demo-github-client-secret',
    callbackUrl: process.env.GITHUB_CALLBACK_URL || 'http://localhost:5000/api/auth/github/callback',
    oauthScopes: ['read:user', 'user:email', 'repo'],
    oauthStateSecret: process.env.OAUTH_STATE_SECRET || process.env.JWT_SECRET || 'codepulse-oauth-state-dev-secret',
  },

  ai: {
    provider: process.env.AI_PROVIDER || 'gemini',
    model: process.env.GEMINI_MODEL || 'gemini-flash-latest',
    timeoutMs: parseInt(process.env.AI_TIMEOUT_MS || '30000', 10),
    geminiApiKey: process.env.GEMINI_API_KEY || '',
    openaiApiKey: process.env.OPENAI_API_KEY || '',
  },

  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',

  scanner: {
    maxFileSizeBytes: 500_000,      // 500 KB per file
    maxFileCount: 300,              // max files to scan per repo
    maxRepoSizeMb: 50,
    timeoutMs: 120_000,             // 2 minutes per scan
    skipDirs: ['node_modules', '.git', 'dist', 'build', '.next', 'coverage', 'vendor'],
    skipExts: ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.webp',
               '.woff', '.woff2', '.ttf', '.eot', '.mp4', '.mp3', '.pdf',
               '.zip', '.tar', '.gz', '.lock'],
  },

  // Health score weights — transparent, documented here
  healthScore: {
    weights: {
      codeQuality: 0.25,
      security: 0.25,
      performance: 0.20,
      maintainability: 0.20,
      dependencies: 0.10,
    },
    penalties: {
      critical: 15,
      high: 8,
      medium: 3,
      low: 1,
    },
  },
};
