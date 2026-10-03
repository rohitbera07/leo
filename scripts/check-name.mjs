import { execFileSync } from 'node:child_process';
for (const name of ['create-leo', 'create-leo-cli']) {
  try {
    const v = execFileSync('npm', ['view', name, 'version'], { encoding: 'utf8', timeout: 10000 }).trim();
    console.log(`${name}: registered (${v})`);
  } catch { console.log(`${name}: not confirmed or registry unavailable`); }
}
