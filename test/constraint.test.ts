import { describe, expect, it } from 'vitest'

import { Status } from '../modules/status.ts'
import { Patient } from '../modules/patient.ts'
import { Assignment } from '../modules/assignment.ts'
import * as C from '../modules/constraint.ts'

describe('isValidPatientCount()', () => {
  describe('when the patient is IMC', () => {
    let p = new Patient({ status: Status.IMC })

    let valid = new Assignment();
    valid.totalPatients = 2; // ideally this type of assignment is disallowed

    let invalid = new Assignment();
    invalid.totalPatients = 3;

    it('limits the assignment to 3 patients.', () => {
      expect(C.isValidPatientCount(p, valid)).toBe(true);
      expect(C.isValidPatientCount(p, invalid)).toBe(false);
    });
  });

  describe('when the patient is MS', () => {
    let p = new Patient({ status: Status.MS })

    let valid = new Assignment();
    valid.totalPatients = 3; // ideally this type of assignment is disallowed

    let invalid = new Assignment();
    invalid.totalPatients = 4;

    it('limits the assignment to 4 patients.', () => {
      expect(C.isValidPatientCount(p, valid)).toBe(true);
      expect(C.isValidPatientCount(p, invalid)).toBe(false);
    });
  });
});

describe('isValidAcuity()', () => {
    let p = new Patient({ acuity: 3 })

    let valid = new Assignment();
    valid.totalAcuity = 7; // ideally this type of assignment is disallowed

    let invalid = new Assignment();
    invalid.totalAcuity = 8;

  it('The assignment is limited to the maximum allowed acuity.', () => {
    expect(C.isValidAcuity(p, valid)).toBe(true);
    expect(C.isValidAcuity(p, invalid)).toBe(false);
  });
});
