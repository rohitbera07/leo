import * as p from '@clack/prompts';
import pc from 'picocolors';
import { templates, type TemplateId } from './registry.js';

export async function interactive(templateArg?: string, nameArg?: string) {
  p.intro(pc.bold('◇ Leo — backend project generator'));
  let templateId = templateArg as TemplateId | undefined;
  if (!templateId) {
    const selected = await p.select({
      message: 'Choose a backend template',
      options: templates.map((t) => ({ value: t.id, label: t.label, hint: `${t.group} · ${t.description}` }))
    });
    if (p.isCancel(selected)) return null;
    templateId = selected as TemplateId;
  }
  let name = nameArg;
  if (!name) {
    const value = await p.text({ message: 'Project name', placeholder: 'my-api', validate: (v) => /^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(v) ? undefined : 'Use letters, numbers, dots, dashes or underscores.' });
    if (p.isCancel(value)) return null;
    name = value;
  }
  return { templateId, name };
}
