import { commandExists, run } from '../utils/process.js';

function packageManager(): string {
  const ua = process.env.npm_config_user_agent ?? '';
  if (ua.startsWith('pnpm/')) return 'pnpm';
  if (ua.startsWith('yarn/')) return 'yarn';
  if (ua.startsWith('bun/')) return 'bun';
  return 'npm';
}

export async function installNode(projectDir: string) {
  const manager = packageManager();
  if (!(await commandExists(manager))) throw new Error(`${manager} was not found. Install it or use npm.`);
  const args = manager === 'yarn' ? ['install'] : ['install'];
  // npm/pnpm/yarn resolve to .cmd shims on Windows; Node reports EINVAL when
  // those are spawned directly without a command shell.
  await run(manager, args, projectDir, undefined, process.platform === 'win32');
}
