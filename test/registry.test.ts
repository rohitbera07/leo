import { describe, expect, it } from 'vitest';
import { templates, getTemplate } from '../src/registry.js';

describe('registry', () => {
  it('contains exactly seven templates', () => expect(templates).toHaveLength(7));
  it('has unique IDs', () => expect(new Set(templates.map(t => t.id)).size).toBe(7));
  it('resolves every template', () => templates.forEach(t => expect(getTemplate(t.id)).toEqual(t)));
  it('uses semantic as the hybrid base', () => expect(getTemplate('hybrid')?.overlay).toBe('semantic'));
});
