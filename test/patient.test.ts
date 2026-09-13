import { describe, expect, test } from 'vitest'
import * as S from '../modules/status.ts'
import * as P from '../modules/patient.ts'

describe('sortByAcuityDesc', () => {
  let patientGen = (a: number): Patient => {
    return {
      acuity: a,
      roomNum: 0,
      bedNum: 0,
      status: S.Status.MS
    }
  }

  test('Sort patients from highest to lowest acuity.', () => {
    let p1 = patientGen(1);
    let p2 = patientGen(2);
    let p3 = patientGen(3);

    expect(P.sortByAcuityDesc([p2, p1, p3])).toStrictEqual([p3, p2, p1]);
  });
});
