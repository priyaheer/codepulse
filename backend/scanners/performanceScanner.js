import path from 'node:path';
import { isSourceFile } from './repositoryScanner.js';

export function scanPerformance(files) {
  const findings = [];
  for (const file of files) {
    if (file.size > 250_000) findings.push({ category: 'performance', severity: 'medium', file: file.path, line: 1, title: 'Large source or asset file', description: 'This file is larger than 250 KB and may increase transfer or parse cost.', rule: 'large-file', evidence: `${file.size} bytes` });
    if (isSourceFile(file.path) && /\buseEffect\s*\(\s*async\b/.test(file.content)) findings.push({ category: 'performance', severity: 'medium', file: file.path, line: 1, title: 'Async effect callback', description: 'React effect callbacks should not directly be async because cleanup handling can be lost; define an inner async function instead.', rule: 'react-async-effect', evidence: 'useEffect(async ...)' });
    if (isSourceFile(file.path) && /\.map\([^)]*=>[^)]*\bfetch\s*\(/s.test(file.content)) findings.push({ category: 'performance', severity: 'high', file: file.path, line: 1, title: 'Request inside collection map', description: 'Starting one request per mapped item can create a request burst; batch or limit concurrency where possible.', rule: 'request-in-map', evidence: '.map(... fetch(...))' });
  }
  return findings;
}
