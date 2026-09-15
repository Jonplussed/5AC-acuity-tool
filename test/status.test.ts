import { describe, expect, test } from 'vitest'
import * as S from '../modules/status.ts'

let imc = S.Status.IMC;
let ms = S.Status.MS;

describe('highest()', () => {
  test('Returns the highest of the given statuses.', () => {
    expect(S.highest(imc, ms)).toBe(imc);
    expect(S.highest(ms, imc)).toBe(imc);
    expect(S.highest(ms, ms)).toBe(ms);
  });
});

describe('fromString()', () => {
  test('Create status from uppercase string.', () => {
    expect(S.fromString('MS')).toBe(ms);
  });

  test('Create status from lowercase string.', () => {
    expect(S.fromString('ms')).toBe(ms);
  });

  test('Throw error with invalid status string.', () => {
    expect(() => S.fromString('')).toThrow();
  });
});

describe('toString()', () => {
  test('Create status from lowercase string.', () => {
    expect(S.toString(ms)).toBe('MS');
  });
});
