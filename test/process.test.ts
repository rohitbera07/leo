import { describe, expect, it } from 'vitest';
import { run } from '../src/utils/process.js';

describe('process runner', () => {
  it('runs the npm command on the current platform', async () => {
    await expect(
      run('npm', ['--version'], process.cwd(), undefined, process.platform === 'win32')
    ).resolves.toBeUndefined();
  });
});
