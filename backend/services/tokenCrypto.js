import crypto from 'node:crypto';
import { config } from '../config/index.js';

const algorithm = 'aes-256-gcm';
const key = crypto.createHash('sha256').update(config.tokenEncryptionKey).digest();

export function encryptToken(value) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [iv.toString('base64url'), tag.toString('base64url'), encrypted.toString('base64url')].join('.');
}

export function decryptToken(value) {
  const parts = String(value || '').split('.');
  if (parts.length !== 3) return value;
  try {
    const iv = Buffer.from(parts[0], 'base64url');
    const tag = Buffer.from(parts[1], 'base64url');
    const encrypted = Buffer.from(parts[2], 'base64url');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8');
  } catch {
    throw new Error('Stored GitHub token could not be decrypted');
  }
}
