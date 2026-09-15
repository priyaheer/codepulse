import { AppError } from './errorHandler.js';

/**
 * Lightweight validation — validates that required fields exist on req.body.
 * Extendable per-route for type checking.
 */
export function requireFields(...fields) {
  return (req, res, next) => {
    const missing = fields.filter((f) => req.body[f] === undefined || req.body[f] === '');
    if (missing.length > 0) {
      return next(new AppError(`Missing required fields: ${missing.join(', ')}`, 400));
    }
    next();
  };
}
