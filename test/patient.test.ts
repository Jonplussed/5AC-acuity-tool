import { describe, expect, it } from 'vitest'

import * as S from '../modules/status.ts'
import * as P from '../modules/patient.ts'

describe('sortByAcuityDesc()', () => {
  it('sorts patients from highest to lowest acuity.', () => {
    let p1 = P.create({ acuity: 1 });
    let p2 = P.create({ acuity: 2 });
    let p3 = P.create({ acuity: 3 });

    expect(P.sortByAcuityDesc([p2, p1, p3])).toStrictEqual([p3, p2, p1]);
  });
});
