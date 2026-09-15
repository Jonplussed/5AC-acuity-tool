import { describe, expect, test } from 'vitest'
import * as S from '../modules/status.ts'
import * as P from '../modules/patient.ts'
import * as A from '../modules/assignment.ts'


describe('isValidPatientCount()', () => {
  describe('when the patient is IMC', () => {
    let patient = P.newPatient({ status: S.Status.IMC })
    let validAssign = A.newAssignment({ totalPatients: 2 });
    let invalidAssign = A.newAssignment({ totalPatients: 3 });

    test('the assignment is limited to 3 patients.', () => {
      expect(A.isValidPatientCount(patient, validAssign)).toBe(true);
      expect(A.isValidPatientCount(patient, invalidAssign)).toBe(false);
    });
  });

  describe('when the patient is MS', () => {
    let patient = P.newPatient({ status: S.Status.MS})
    let validAssign = A.newAssignment({ totalPatients: 3 });
    let invalidAssign = A.newAssignment({ totalPatients: 4 });

    test('the assignment is limited to 3 patients.', () => {
      expect(A.isValidPatientCount(patient, validAssign)).toBe(true);
      expect(A.isValidPatientCount(patient, invalidAssign)).toBe(false);
    });
  });
});

describe('isValidAcuity()', () => {
  let patient = P.newPatient({ acuity: 3 });
  let validAssign = A.newAssignment({ totalAcuity: 7 });
  let invalidAssign = A.newAssignment({ totalAcuity: 8 });

  test('The assignment is limited to the maximum allowed acuity.', () => {
    expect(A.isValidAcuity(patient, validAssign)).toBe(true);
    expect(A.isValidAcuity(patient, invalidAssign)).toBe(false);
  });
});
