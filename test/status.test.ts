import { describe, expect, it } from 'vitest'

import * as S from '../modules/status.ts'

let imc = S.Status.IMC;
let ms = S.Status.MS;

describe('highest()', () => {
  it('Returns the highest of the given statuses.', () => {
    expect(S.highest(imc, ms)).toBe(imc);
    expect(S.highest(ms, imc)).toBe(imc);
    expect(S.highest(ms, ms)).toBe(ms);
  });
});

describe('fromString()', () => {
  it('makes a status from uppercase string.', () => {
    expect(S.fromString('MS')).toBe(ms);
  });

  it('makes a status from lowercase string.', () => {
    expect(S.fromString('ms')).toBe(ms);
  });

  it('throws an error with invalid status string.', () => {
    expect(() => S.fromString('')).toThrow();
  });
});

describe('toString()', () => {
  it('makes a string from the status.', () => {
    expect(S.toString(ms)).toBe('MS');
  });
});
