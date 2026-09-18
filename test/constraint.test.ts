import { describe, expect, it } from 'vitest'

import * as S from '../modules/status.ts'
import * as P from '../modules/patient.ts'
import * as A from '../modules/assignment.ts'
import * as C from '../modules/constraint.ts'

describe('isValidPatientCount()', () => {
  describe('when the patient is IMC', () => {
    let p = P.create({ status: S.Status.IMC })

    let valid = A.empty();
    valid.totalPatients = 2; // ideally this type of assignment is disallowed

    let invalid = A.empty();
    invalid.totalPatients = 3;

    it('limits the assignment to 3 patients.', () => {
      expect(C.isValidPatientCount(p, valid)).toBe(true);
      expect(C.isValidPatientCount(p, invalid)).toBe(false);
    });
  });

  describe('when the patient is MS', () => {
    let p = P.create({ status: S.Status.MS })

    let valid = A.empty();
    valid.totalPatients = 3; // ideally this type of assignment is disallowed

    let invalid = A.empty();
    invalid.totalPatients = 4;

    it('limits the assignment to 4 patients.', () => {
      expect(C.isValidPatientCount(p, valid)).toBe(true);
      expect(C.isValidPatientCount(p, invalid)).toBe(false);
    });
  });
});

describe('isValidAcuity()', () => {
    let p = P.create({ acuity: 3 })

    let valid = A.empty();
    valid.totalAcuity = 7; // ideally this type of assignment is disallowed

    let invalid = A.empty();
    invalid.totalAcuity = 8;

  it('The assignment is limited to the maximum allowed acuity.', () => {
    expect(C.isValidAcuity(p, valid)).toBe(true);
    expect(C.isValidAcuity(p, invalid)).toBe(false);
  });
});
