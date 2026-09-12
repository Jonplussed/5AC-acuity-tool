import { expect, test } from 'vitest'
import * as S from '../modules/status.ts'

test('Status from uppercase string.', () => {
  expect(S.fromString('MS')).toBe(S.Status.MS);
})

test('Status from lowercase string.', () => {
  expect(S.fromString('ms')).toBe(S.Status.MS);
})
