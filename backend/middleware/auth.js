import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
import { User } from '../models/User.js';
import { AppError } from './errorHandler.js';

export async function requireAuth(req, res, next) {
  try {
    // Support both cookie-based and Authorization header JWT
    const token =
      req.cookies?.cp_token ||
      (req.headers.authorization?.startsWith('Bearer ')
        ? req.headers.authorization.slice(7)
        : null);

    if (!token) throw new AppError('Authentication required', 401);

    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await User.findById(decoded.sub);

    if (!user) throw new AppError('User not found', 401);

    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      next(new AppError('Invalid or expired token — please sign in again', 401));
    } else {
      next(err);
    }
  }
}

export function generateToken(userId) {
  return jwt.sign({ sub: userId }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
}
