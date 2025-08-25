import { describe, it, expect, vi } from 'vitest';
import { z } from 'zod';

import type { FieldConfig } from '../../features/mainPage/components/formConfig';

import { parseUncontrolledForm, fileToBase64 } from './formHelpers';

describe('formHelpers utilities', () => {
  it('should fileToBase64 resolves with file content', async () => {
    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });

    const result = await fileToBase64(file);
    expect(result).toMatch(/^data:text\/plain;base64,/);
  });

  it('should fileToBase64 rejects on error', async () => {
    const reader = {
      readAsDataURL: vi.fn(function (this: FileReader) {
        const event = {} as ProgressEvent<FileReader>;
        this.onerror?.(event);
      }),
      onload: null,
      onerror: null,
    } as unknown as FileReader;

    vi.spyOn(global, 'FileReader').mockImplementation(() => reader);

    const file = new File([''], 'file.txt');
    await expect(fileToBase64(file)).rejects.toThrow('File reading failed');
  });

  it('should parseUncontrolledForm parses form data correctly', async () => {
    const form = document.createElement('form');

    const fields: FieldConfig[] = [
      { name: 'name', type: 'text', label: 'Name' },
      { name: 'age', type: 'number', label: 'Age' },
      { name: 'agree', type: 'checkbox', label: 'Agree' },
    ];

    const nameInput = document.createElement('input');
    nameInput.name = 'name';
    nameInput.value = 'John';
    form.appendChild(nameInput);

    const ageInput = document.createElement('input');
    ageInput.name = 'age';
    ageInput.value = '30';
    form.appendChild(ageInput);

    const agreeInput = document.createElement('input');
    agreeInput.type = 'checkbox';
    agreeInput.name = 'agree';
    agreeInput.checked = true;
    form.appendChild(agreeInput);

    const schema = z.object({
      name: z.string(),
      age: z.number(),
      agree: z.boolean(),
    });

    const result = await parseUncontrolledForm(form, fields, schema);
    expect(result).toEqual({
      data: { name: 'John', age: 30, agree: true },
    });
  });

  it('should parseUncontrolledForm returns errors on invalid data', async () => {
    const form = document.createElement('form');

    const fields: FieldConfig[] = [
      { name: 'name', type: 'text', label: 'Name' },
    ];

    const nameInput = document.createElement('input');
    nameInput.name = 'name';
    nameInput.value = '';
    form.appendChild(nameInput);

    const schema = z.object({
      name: z.string().min(1, 'Name required'),
    });

    const result = await parseUncontrolledForm(form, fields, schema);
    expect(result.errors).toHaveProperty('name');
  });
});
