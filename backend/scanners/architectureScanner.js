function has(files, pattern) { return files.some((file) => pattern.test(file.path)); }

export function scanArchitecture(files) {
  const names = files.map((file) => file.path);
  const frontend = has(files, /(^|\/)(src\/)?(App|main)\.(jsx?|tsx?)$/) ? 'React' : has(files, /\.vue$/) ? 'Vue' : has(files, /\.svelte$/) ? 'Svelte' : null;
  const backend = has(files, /(^|\/)(server|app|index)\.(js|ts)$/) ? 'Node.js' : null;
  const database = has(files, /(models?|schema|mongoose|prisma|drizzle)/i) ? 'Database integration detected' : null;
  const summary = { frontend, backend, database, routes: names.filter((name) => /(routes?|router)/i.test(name)).slice(0, 30), apiServices: names.filter((name) => /(services?|api|client)/i.test(name)).slice(0, 30), authentication: names.filter((name) => /(auth|session|jwt|oauth)/i.test(name)).slice(0, 30), importantDirectories: [...new Set(names.map((name) => name.split('/')[0]).filter(Boolean))], majorComponents: names.filter((name) => /(component|controller|model|service|scanner)/i.test(name)).slice(0, 50) };
  return { summary, findings: [] };
}
