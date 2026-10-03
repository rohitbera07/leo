#!/usr/bin/env node
import { parseArgs } from 'node:util';
import * as p from '@clack/prompts';
import pc from 'picocolors';
import { templates, getTemplate } from './registry.js';
import { interactive } from './prompts.js';
import { generate } from './generate.js';

const { values, positionals } = parseArgs({
  options: {
    template: { type: 'string', short: 't' },
    'no-install': { type: 'boolean', default: false },
    help: { type: 'boolean', short: 'h' },
    version: { type: 'boolean', short: 'v' },
    list: { type: 'boolean' }
  },
  allowPositionals: true,
  strict: true
});

if (values.version) {
  console.log('0.1.0');
  process.exit(0);
}

if (values.help) {
  console.log(`${pc.bold('create-leo')} — lightweight backend project generator\n\nUsage:\n  npx create-leo [project-name]\n  npx create-leo my-api --template express-mongodb\n  npx create-leo my-rag --template semantic --no-install\n\nOptions:\n  -t, --template <id>  Generate directly from a template\n      --no-install     Skip dependency installation\n      --list           List templates\n  -h, --help            Show help\n  -v, --version         Show version\n\nTemplates:\n${templates.map((t) => `  ${t.id.padEnd(20)} ${t.description}`).join('\n')}`);
  process.exit(0);
}

if (values.list) {
  for (const t of templates) console.log(`${t.id}\t${t.description}`);
  process.exit(0);
}

try {
  if (values.template && !getTemplate(values.template)) throw new Error(`Unknown template '${values.template}'. Run --list to see valid IDs.`);
  const chosen = await interactive(values.template, positionals[0]);
  if (!chosen) process.exit(0);
  await generate(chosen.templateId, chosen.name, values['no-install']);
} catch (error) {
  if ((error as NodeJS.ErrnoException).code === 'ERR_USE_AFTER_CLOSE') process.exit(130);
  console.error(`\n${pc.red('✖')} ${error instanceof Error ? error.message : String(error)}`);
  p.outro(pc.dim('No partial project was left behind.'));
  process.exit(1);
}
