import { beforeEach, describe, expect, it } from 'vitest'

import { Status } from "../modules/status.ts"
import { Bed } from "../modules/bed.ts"
import { Patient } from "../modules/patient.ts"
import { Assignment } from "../modules/assignment.ts"
import { Roster } from "../modules/roster.ts"

describe('new Roster()', () => {
  let r = new Roster({ count: 3 });

  it('is a new roster with the given number of assignments', () => {
    expect(r.assignments.length).toBe(3);
    expect(r.assignments).toEqual([
      new Assignment(),
      new Assignment(),
      new Assignment(),
    ]);
  });
});

describe('fill()', () => {
  describe('with all med-surg patients', () => {
    let p1 = new Patient({ acuity: 1, status: Status.MS, bed: new Bed(1,1) });
    let p2 = new Patient({ acuity: 2, status: Status.MS, bed: new Bed(2,1) });
    let p3 = new Patient({ acuity: 3, status: Status.MS, bed: new Bed(3,1) });
    let p4 = new Patient({ acuity: 4, status: Status.MS, bed: new Bed(4,1) });

    let ps: Patient;
    let r: Roster;

    beforeEach(() => {
      ps = [p1,p3,p2,p4];
    });

    it('initially fills the roster from lowest to highest acuity', () => {
      r = new Roster({ count: 5 }).fill(ps);

      expect(r.assignments).toEqual([
        new Assignment(),
        new Assignment().addPatient(p1),
        new Assignment().addPatient(p2),
        new Assignment().addPatient(p3),
        new Assignment().addPatient(p4),
      ]);
    });

    it('reorders the assignments as it fills', () => {
      r = new Roster({ count: 3 }).fill(ps);

      expect(r.assignments).toEqual([
        new Assignment().addPatient(p3),
        new Assignment().addPatient(p2, p1),
        new Assignment().addPatient(p4),
      ]);
    });
  });
});
