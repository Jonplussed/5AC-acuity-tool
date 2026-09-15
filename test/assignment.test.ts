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
      expect(A.isAllowedCount(patient, validAssign)).toBe(true);
      expect(A.isAllowedCount(patient, invalidAssign)).toBe(false);
    });
  });
});
