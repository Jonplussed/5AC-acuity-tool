import { expect, test } from 'vitest'
import * as S from '../modules/status.ts'

test('Status from string.', () => {
  expect(S.fromString('MS')).toBe(S.MS);
})
