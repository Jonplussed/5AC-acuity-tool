import { describe, expect, test } from 'vitest'
import * as S from '../modules/status.ts'

describe('fromString()', () => {
  test('Create status from uppercase string.', () => {
    expect(S.fromString('MS')).toBe(S.Status.MS);
  });

  test('Create status from lowercase string.', () => {
    expect(S.fromString('ms')).toBe(S.Status.MS);
  });

  test('Throw error with invalid status string.', () => {
    expect(() => S.fromString('')).toThrow();
  });
});

describe('toString()', () => {
  test('Create status from lowercase string.', () => {
    expect(S.toString(S.Status.MS)).toBe('MS');
  });
});
