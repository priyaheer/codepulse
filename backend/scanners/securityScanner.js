const secretPatterns = [
  { rule: 'hardcoded-api-key', title: 'Possible hardcoded API key', pattern: /\b(api[_-]?key|apikey)\b\s*[:=]\s*["']([^"']{12,})["']/i },
  { rule: 'hardcoded-token', title: 'Possible hardcoded access token', pattern: /\b(token|access[_-]?token)\b\s*[:=]\s*["']([^"']{12,})["']/i },
  { rule: 'private-key', title: 'Private key material detected', pattern: /-----BEGIN [A-Z ]*PRIVATE KEY-----/ },
  { rule: 'cloud-secret', title: 'Possible cloud credential', pattern: /\b(AWS_SECRET_ACCESS_KEY|GITHUB_TOKEN|STRIPE_SECRET_KEY)\b\s*[:=]\s*["']([^"']{8,})["']/i },
  { rule: 'password-literal', title: 'Hardcoded password', pattern: /\b(password|passwd|secret)\b\s*[:=]\s*["']([^"']{8,})["']/i },
];

function mask(value) {
  if (!value) return '';
  return value.length <= 8 ? '********' : `${value.slice(0, 6)}${'*'.repeat(Math.min(16, value.length - 6))}`;
}

export function scanSecurity(files) {
  const findings = [];
  for (const file of files) {
    const lines = file.content.split(/\r?\n/);
    lines.forEach((line, index) => {
      for (const item of secretPatterns) {
        const match = line.match(item.pattern);
        if (!match) continue;
        const raw = match[2] || match[0];
        const evidence = item.rule === 'private-key' ? 'private key header detected' : `${item.rule}: ${mask(raw)}`;
        findings.push({ category: 'security', severity: item.rule === 'private-key' ? 'critical' : 'high', file: file.path, line: index + 1, title: item.title, description: 'A credential-like value was found in repository text. Rotate it and move the value to a secret manager or environment variable.', rule: item.rule, evidence });
        break;
      }
    });
  }
  return findings;
}
