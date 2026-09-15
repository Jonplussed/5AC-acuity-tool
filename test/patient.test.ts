import { describe, expect, test } from 'vitest'
import * as S from '../modules/status.ts'
import * as P from '../modules/patient.ts'

describe('sortByAcuityDesc', () => {
  test('Sort patients from highest to lowest acuity.', () => {
    let p1 = P.newPatient({ acuity: 1 });
    let p2 = P.newPatient({ acuity: 2 });
    let p3 = P.newPatient({ acuity: 3 });

    expect(P.sortByAcuityDesc([p2, p1, p3])).toStrictEqual([p3, p2, p1]);
  });
});
