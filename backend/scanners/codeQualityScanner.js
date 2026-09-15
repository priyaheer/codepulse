import { isSourceFile } from './repositoryScanner.js';

function finding(file, line, title, description, rule, evidence, severity = 'low') {
  return { category: 'code-quality', severity, file: file.path, line, title, description, rule, evidence };
}

export function scanCodeQuality(files) {
  const findings = [];
  for (const file of files.filter((item) => isSourceFile(item.path))) {
    const lines = file.content.split(/\r?\n/);
    let braceDepth = 0;
    let functionDepth = 0;
    let maxDepth = 0;
    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      const trimmed = line.trim();
      if (/\bconsole\.(log|debug|info|warn|error)\s*\(/.test(trimmed)) {
        findings.push(finding(file, lineNumber, 'Console statement in source', 'Console output should be removed or routed through the application logger before production.', 'no-console', trimmed, 'low'));
      }
      if (/^\s*(return|throw)\b/.test(line) && /\b(if|for|while|switch|try)\b/.test(lines[index + 1] || '')) {
        findings.push(finding(file, lineNumber, 'Suspicious unreachable branch', 'A control-flow statement is immediately followed by another block on the next line; review this branch for unreachable code.', 'no-unreachable', trimmed, 'medium'));
      }
      if (/\b(async\s+)?function\s+\w+|=>\s*\{|\b(class|method)\s+\w+/.test(line)) functionDepth += 1;
      braceDepth += (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;
      maxDepth = Math.max(maxDepth, braceDepth);
      if (functionDepth && braceDepth <= 0) functionDepth = 0;
    });
    if (maxDepth >= 6) {
      findings.push(finding(file, 1, 'Deep control flow', 'This file reaches at least six nested brace levels, which makes behavior harder to test and maintain.', 'complexity-depth', `max brace depth: ${maxDepth}`, 'medium'));
    }
    const unusedLike = file.content.match(/(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*[^;]+;/g) || [];
    for (const declaration of unusedLike) {
      const match = declaration.match(/(?:const|let|var)\s+([A-Za-z_$][\w$]*)/);
      if (match && file.content.split(match[1]).length - 1 === 1) {
        findings.push(finding(file, lines.findIndex((line) => line.includes(declaration)) + 1, `Unused variable '${match[1]}'`, 'The declared variable is not referenced elsewhere in this file.', 'no-unused-vars', declaration, 'low'));
      }
    }
    if (/fetch\([^)]*\)\.then\([^)]*\)\.then\([^)]*\)/s.test(file.content)) {
      findings.push(finding(file, 1, 'Long promise chain', 'A long promise chain was detected; consider extracting steps and handling failures close to the request.', 'promise-chain-readability', 'multiple chained .then calls', 'low'));
    }
  }
  return findings;
}
