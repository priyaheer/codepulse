import test from 'node:test';
import assert from 'node:assert/strict';
import { serializeUserProfile } from '../controllers/authController.js';

test('serializeUserProfile includes authenticated GitHub profile data', () => {
  const profile = serializeUserProfile({
    _id: '67d5d5d5d5d5d5d5d5d5d5d',
    username: 'octocat',
    name: 'The Octocat',
    email: 'octocat@example.com',
    avatarUrl: 'https://github.com/images/octocat.png',
    githubId: '1',
    githubProfileUrl: 'https://github.com/octocat',
    publicRepos: 12,
    followers: 34,
    following: 56,
    aiProviderPreference: 'gemini',
  });

  assert.equal(profile.username, 'octocat');
  assert.equal(profile.githubProfileUrl, 'https://github.com/octocat');
  assert.equal(profile.publicRepos, 12);
  assert.equal(profile.followers, 34);
  assert.equal(profile.following, 56);
  assert.equal(profile.githubId, '1');
});
