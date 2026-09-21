import { describe, expect, it } from 'vitest'

import { Patient } from '../modules/patient.ts'

import * as S from '../modules/status.ts'

describe('Patient.sortByAcuityDesc()', () => {
  it('sorts patients from highest to lowest acuity.', () => {
    let p1 = new Patient({ acuity: 1 });
    let p2 = new Patient({ acuity: 2 });
    let p3 = new Patient({ acuity: 3 });

    expect(Patient.sortByAcuityDesc([p2, p1, p3])).toStrictEqual([p3, p2, p1]);
  });
});
