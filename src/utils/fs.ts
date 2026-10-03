import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

export async function copyDir(src: string, dest: string) {
  await mkdir(dest, { recursive: true });
  await cp(src, dest, { recursive: true, force: true, errorOnExist: false });
}

export async function replaceInTree(root: string, replacements: Record<string, string>) {
  const entries = await walk(root);
  for (const file of entries) {
    if (!file.endsWith('.json') && !file.endsWith('.md') && !file.endsWith('.txt') && !file.endsWith('.env.example') && !file.endsWith('.py') && !file.endsWith('.js') && !file.endsWith('.ts')) continue;
    const buf = await readFile(file);
    if (buf.includes(0)) continue;
    let text = buf.toString('utf8');
    for (const [from, to] of Object.entries(replacements)) text = text.split(from).join(to);
    await writeFile(file, text);
  }
}

export async function walk(dir: string): Promise<string[]> {
  const { readdir, stat } = await import('node:fs/promises');
  const out: string[] = [];
  for (const entry of await readdir(dir)) {
    const full = path.join(dir, entry);
    const s = await stat(full);
    if (s.isDirectory()) out.push(...await walk(full));
    else out.push(full);
  }
  return out;
}

export function pathExists(p: string) { return existsSync(p); }
