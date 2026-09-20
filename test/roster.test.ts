import { beforeEach, describe, expect, it } from 'vitest'

import * as S from "../modules/status.ts"
import * as P from "../modules/patient.ts"
import * as A from "../modules/assignment.ts"
import * as C from "../modules/constraint.ts"
import * as R from "../modules/roster.ts"

describe('empty()', () => {
  let r = R.empty(3);

  it('is a new roster with the given number of assignments', () => {
    expect(r.assignmentCount).toBe(3);
    expect(r.assignments.length).toBe(3);
    expect(r.assignments).toEqual([A.empty(), A.empty(), A.empty()]);
  });
});

describe('fill()', () => {
  describe('with all med-surg patients', () => {
    let p1 = P.create({ room: 1, bed: 1, acuity: 1 });
    let p2 = P.create({ room: 1, bed: 2, acuity: 2 });
    let p3 = P.create({ room: 2, bed: 1, acuity: 3 });
    let p4 = P.create({ room: 2, bed: 2, acuity: 4 });

    let ps: P.Patient;
    let r: R.Roster;

    beforeEach(() => {
      ps = [p1,p3,p2,p4];
    });

    it('initially fills the roster from lowest to highest acuity', () => {
      r = R.empty(5);
      R.fill(r, ps);

      expect(r.assignments).toEqual([
        A.empty(),
        A.insert(A.empty(), p1),
        A.insert(A.empty(), p2),
        A.insert(A.empty(), p3),
        A.insert(A.empty(), p4),
      ]);
    });
  });
});
