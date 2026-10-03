import path from 'node:path';
import { commandExists, run } from '../utils/process.js';

async function pythonCommand(): Promise<string> {
  if (process.platform === 'win32' && await commandExists('py')) return 'py';
  if (await commandExists('python3')) return 'python3';
  if (await commandExists('python')) return 'python';
  throw new Error('Python 3.11+ was not found. Install Python or uv first.');
}

async function checkPython311(py: string) {
  const { execFileSync } = await import('node:child_process');
  try {
    const args = process.platform === 'win32' && py === 'py' ? ['-3', '--version'] : ['--version'];
    const output = execFileSync(py, args, { encoding: 'utf8' }).trim();
    const match = output.match(/Python (\d+)\.(\d+)/);
    if (!match || Number(match[1]) < 3 || (Number(match[1]) === 3 && Number(match[2]) < 11)) {
      throw new Error(`Python 3.11+ required; found ${output}`);
    }
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Python 3.11+ required')) throw error;
    throw new Error('Unable to verify Python 3.11+. Install a supported Python runtime.');
  }
}

export async function installPython(projectDir: string) {
  const py = await pythonCommand();
  await checkPython311(py);

  if (await commandExists('uv')) {
    await run('uv', ['venv', '.venv', '--python', '3.11'], projectDir);
    const uvPython = path.join(
      projectDir,
      '.venv',
      process.platform === 'win32' ? 'Scripts' : 'bin',
      process.platform === 'win32' ? 'python.exe' : 'python'
    );
    await run(uvPython, ['-m', 'pip', 'install', '-r', 'requirements.txt'], projectDir);
    return;
  }

  const pyArgs = process.platform === 'win32' && py === 'py' ? ['-3'] : [];
  await run(py, [...pyArgs, '-m', 'venv', '.venv'], projectDir);

  const venvPython = path.join(
    projectDir,
    process.platform === 'win32' ? '.venv' : '.venv',
    process.platform === 'win32' ? 'Scripts' : 'bin',
    process.platform === 'win32' ? 'python.exe' : 'python'
  );
  await run(venvPython, ['-m', 'pip', 'install', '-r', 'requirements.txt'], projectDir);
}
