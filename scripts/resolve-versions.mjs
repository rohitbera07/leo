import { execFileSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const versionsUrl = new URL('versions.json', root);
const versions = JSON.parse(await readFile(versionsUrl, 'utf8'));

function npmLatest(name, fallback) {
  try {
    const version = execFileSync('npm', ['view', name, 'version'], { encoding: 'utf8', timeout: 15000 }).trim();
    return version ? `^${version}` : fallback;
  } catch { return fallback; }
}
function pipLatest(name, fallback) {
  try {
    const query = name.replace(/\[.*\]/, '');
    const output = execFileSync('python', ['-m', 'pip', 'index', 'versions', query], { encoding: 'utf8', timeout: 15000, stderr: 'ignore' });
    const match = output.match(/Available versions:\s*([^\n\r]+)/i);
    const version = match?.[1]?.split(',')[0]?.trim();
    return version ? `${name}==${version}` : fallback;
  } catch { return fallback; }
}

for (const name of Object.keys(versions.node)) versions.node[name] = npmLatest(name, versions.node[name]);
for (const name of Object.keys(versions.python)) versions.python[name] = pipLatest(name, versions.python[name]);
await writeFile(versionsUrl, JSON.stringify(versions, null, 2) + '\n');

for (const name of ['express-mongodb', 'express-postgres', 'fastify-postgres']) {
  const pkgUrl = new URL(`templates/${name}/package.json`, root);
  const pkg = JSON.parse(await readFile(pkgUrl, 'utf8'));
  for (const dep of Object.keys(pkg.dependencies ?? {})) if (versions.node[dep]) pkg.dependencies[dep] = versions.node[dep];
  await writeFile(pkgUrl, JSON.stringify(pkg, null, 2) + '\n');
}

const pyFiles = ['fastapi-postgres', 'fastapi-mongodb', 'semantic', 'hybrid'];
for (const name of pyFiles) {
  const reqUrl = new URL(`templates/${name}/requirements.txt`, root);
  const original = (await readFile(reqUrl, 'utf8')).split(/\r?\n/).filter(Boolean);
  const resolved = original.map(line => {
    const key = line.replace(/\[.*\]/, '');
    return versions.python[key] ?? line;
  });
  await writeFile(reqUrl, resolved.join('\n') + '\n');
}
console.log('Dependency versions resolved where the registries were reachable.');
