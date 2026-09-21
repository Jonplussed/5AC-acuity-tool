import { describe, expect, it } from 'vitest'

import { Status } from '../modules/status.ts'

let imc = Status.IMC;
let ms = Status.MS;

describe('highest()', () => {
  it('Returns the highest of the given statuses.', () => {
    expect(Status.highest(imc, ms)).toBe(imc);
    expect(Status.highest(ms, imc)).toBe(imc);
    expect(Status.highest(ms, ms)).toBe(ms);
  });
});

describe('fromString()', () => {
  it('makes a status from uppercase string.', () => {
    expect(Status.fromString('MS')).toBe(ms);
  });

  it('makes a status from lowercase string.', () => {
    expect(Status.fromString('ms')).toBe(ms);
  });

  it('throws an error with invalid status string.', () => {
    expect(() => Status.fromString('')).toThrow();
  });
});

describe('label', () => {
  it('makes a string from the status.', () => {
    expect(ms.label).toBe('MS');
  });
});
