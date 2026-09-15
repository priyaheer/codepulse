import axios from 'axios';
import { Octokit } from '@octokit/rest';
import { config } from '../config/index.js';
import { User } from '../models/User.js';
import { generateToken } from '../middleware/auth.js';
import { AppError } from '../middleware/errorHandler.js';

/**
 * Step 1: Redirect user to GitHub OAuth
 * GET /api/auth/github
 */
export function githubRedirect(req, res) {
  const params = new URLSearchParams({
    client_id: config.github.clientId,
    redirect_uri: config.github.callbackUrl,
    scope: config.github.oauthScopes.join(' '),
    state: Math.random().toString(36).slice(2),
  });
  res.redirect(`https://github.com/login/oauth/authorize?${params}`);
}

/**
 * Step 2: Handle callback, exchange code for token, upsert user
 * GET /api/auth/github/callback
 */
export async function githubCallback(req, res, next) {
  try {
    const { code, error } = req.query;

    if (error) throw new AppError('GitHub authorization was denied', 400);
    if (!code) throw new AppError('No OAuth code received', 400);

    // Exchange code for access token
    const tokenRes = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: config.github.clientId,
        client_secret: config.github.clientSecret,
        code,
        redirect_uri: config.github.callbackUrl,
      },
      { headers: { Accept: 'application/json' } }
    );

    const { access_token, error: tokenError } = tokenRes.data;
    if (tokenError || !access_token) {
      throw new AppError('Failed to obtain GitHub access token', 400);
    }

    // Fetch GitHub user profile
    const octokit = new Octokit({ auth: access_token });
    const { data: ghUser } = await octokit.rest.users.getAuthenticated();

    // Fetch primary email if not public
    let email = ghUser.email || '';
    if (!email) {
      try {
        const { data: emails } = await octokit.rest.users.listEmailsForAuthenticatedUser();
        const primary = emails.find((e) => e.primary);
        email = primary?.email || '';
      } catch {
        // not critical — continue without email
      }
    }

    // Upsert user record
    const user = await User.findOneAndUpdate(
      { githubId: String(ghUser.id) },
      {
        githubId: String(ghUser.id),
        username: ghUser.login,
        name: ghUser.name || ghUser.login,
        email,
        avatarUrl: ghUser.avatar_url,
        githubAccessToken: access_token, // TODO: encrypt in production
      },
      { upsert: true, new: true }
    );

    // Issue JWT and redirect to frontend
    const token = generateToken(user._id);
    res
      .cookie('cp_token', token, {
        httpOnly: true,
        secure: !config.isDev,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .redirect(`${config.clientUrl}/app/dashboard`);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/auth/me — returns current user (no token)
 */
export async function getMe(req, res) {
  res.json({
    id: req.user._id,
    username: req.user.username,
    name: req.user.name,
    email: req.user.email,
    avatarUrl: req.user.avatarUrl,
    aiProviderPreference: req.user.aiProviderPreference,
  });
}

/**
 * POST /api/auth/logout
 */
export function logout(req, res) {
  res.clearCookie('cp_token').json({ message: 'Logged out' });
}
