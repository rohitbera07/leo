import { spawn } from 'node:child_process';

function executable(command: string) {
  if (process.platform !== 'win32') return command;
  if (command === 'npm') return 'npm.cmd';
  if (command === 'pnpm') return 'pnpm.cmd';
  if (command === 'yarn') return 'yarn.cmd';
  if (command === 'bun') return 'bun.exe';
  return command;
}

export function run(command: string, args: string[], cwd: string, env?: NodeJS.ProcessEnv, shell = false): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(executable(command), args, {
      cwd,
      env: { ...process.env, ...env },
      stdio: 'inherit',
      // Windows cannot launch .cmd shims (npm.cmd, uv.cmd, etc.) directly.
      // Callers opt into the shell only for trusted, fixed package-manager args.
      shell
    });
    child.on('error', reject);
    child.on('exit', (code, signal) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} exited with ${code ?? signal}`));
    });
  });
}

export async function commandExists(command: string): Promise<boolean> {
  const checker = process.platform === 'win32' ? 'where' : 'which';
  return new Promise((resolve) => {
    const child = spawn(checker, [command], { stdio: 'ignore', shell: false });
    child.on('exit', (code) => resolve(code === 0));
    child.on('error', () => resolve(false));
  });
}
