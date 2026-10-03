import path from 'node:path';
import { mkdir, cp, readFile, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import * as p from '@clack/prompts';
import pc from 'picocolors';
import { getTemplate, type Template } from './registry.js';
import { copyDir, pathExists, replaceInTree, walk } from './utils/fs.js';
import { installNode } from './install/node.js';
import { installPython } from './install/python.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(here, '..');
const templateRoot = path.join(packageRoot, 'templates');

async function renameGitignore(root: string) {
  const entries = await walk(root);
  for (const file of entries) {
    if (path.basename(file) === '_gitignore') {
      await cp(file, path.join(path.dirname(file), '.gitignore'));
      await rm(file);
    }
  }
}

async function patchPackageJson(root: string, name: string) {
  const pkg = path.join(root, 'package.json');
  if (!pathExists(pkg)) return;
  const json = JSON.parse(await readFile(pkg, 'utf8'));
  json.name = name;
  await writeFile(pkg, JSON.stringify(json, null, 2) + '\n');
}

export async function generate(templateId: string, projectName: string, noInstall = false) {
  const template = getTemplate(templateId);
  if (!template) throw new Error(`Unknown template: ${templateId}`);
  const target = path.resolve(process.cwd(), projectName);
  if (pathExists(target)) throw new Error(`Target folder already exists: ${target}`);

  let committed = false;
  const onInterrupt = async () => { await rm(target, { recursive: true, force: true }); process.exit(130); };
  process.once('SIGINT', onInterrupt);
  try {
    await mkdir(target, { recursive: true });
    await copyDir(path.join(templateRoot, '_shared'), target);
    if (template.overlay) await copyDir(path.join(templateRoot, template.overlay), target);
    await copyDir(path.join(templateRoot, template.id), target);
    await replaceInTree(target, { '{{name}}': projectName });
    await patchPackageJson(target, projectName);
    const envExample = path.join(target, '.env.example');
    if (pathExists(envExample)) await cp(envExample, path.join(target, '.env'));
    await renameGitignore(target);
    committed = true;

    if (!noInstall) {
      const spin = p.spinner();
      spin.start(`Installing ${template.language} dependencies`);
      try {
        if (template.language === 'node') await installNode(target);
        else await installPython(target);
        spin.stop('Dependencies installed');
      } catch (error) {
        spin.stop('Dependency installation failed');
        throw error;
      }
    }

    printNextSteps(target, projectName, template);
    return target;
  } catch (error) {
    await rm(target, { recursive: true, force: true });
    throw error;
  } finally {
    process.removeListener('SIGINT', onInterrupt);
  }
}

function printNextSteps(target: string, name: string, template: Template) {
  const rel = path.relative(process.cwd(), target) || name;
  console.log(`\n${pc.green('✔')} Created ${pc.bold(name)} using ${template.label}`);
  console.log(`\n${pc.dim('Next steps')}`);
  console.log(`  ${pc.cyan(`cd ${rel}`)}`);
  if (template.language === 'node') {
    console.log(`  ${pc.cyan('cp .env.example .env')}`);
    console.log(`  ${pc.cyan('npm run dev')}`);
  } else {
    console.log(`  ${pc.cyan('cp .env.example .env')}`);
    console.log(`  ${pc.cyan('source .venv/bin/activate')} ${pc.dim('(macOS/Linux)')}`);
    console.log(`  ${pc.cyan('uvicorn app.main:app --reload')} ${pc.dim('(or use the Windows venv equivalent)')}`);
  }
  console.log(`\n${pc.dim('Health:')} ${pc.cyan('GET /health')}`);
}
