import { describe, expect, it } from 'vitest'

import { Status } from '../modules/status.ts'
import { Patient } from '../modules/patient.ts'
import { Assignment } from '../modules/assignment.ts'
import { Constraints } from '../modules/constraint.ts'

describe('addMaxPatientsForIMC()', () => {
  let constraints = (new Constraints()).addMaxPatientsForIMC(3);

  describe('when the patient is IMC', () => {
    let patient = new Patient({ status: Status.IMC })

    let valid = new Assignment();
    valid.totalPatients = 2; // ideally this type of assignment is disallowed

    let invalid = new Assignment();
    invalid.totalPatients = 3;

    it('limits the assignment to "n" patients.', () => {
      expect(constraints.test(patient, valid)).toBe(true);
      expect(constraints.test(patient, invalid)).toBe(false);
    });
  });

  describe('when the patient is MS', () => {
    let patient = new Patient({ status: Status.MS })
    let valid = new Assignment();
    valid.totalPatients = 1000;

    it('is always true', () => {
      expect(constraints.test(patient, valid)).toBe(true);
    });
  });
});

describe('addMaxPatientsForMS()', () => {
  let constraints = (new Constraints()).addMaxPatientsForMS(4);

  describe('when the patient is IMC', () => {
    let patient = new Patient({ status: Status.IMC })
    let valid = new Assignment();
    valid.totalPatients = 1000;

    it('is always true', () => {
      expect(constraints.test(patient, valid)).toBe(true);
    });
  });

  describe('when the patient is MS', () => {
    let patient = new Patient({ status: Status.MS })

    let valid = new Assignment();
    valid.totalPatients = 3;

    let invalid = new Assignment();
    invalid.totalPatients = 4;

    it('limits the assignment to 3 patients.', () => {
      expect(constraints.test(patient, valid)).toBe(true);
      expect(constraints.test(patient, invalid)).toBe(false);
    });
  });
});

describe('isValidAcuity()', () => {
    let constraints = (new Constraints()).addMaxTotalAcuity(10);
    let patient = new Patient({ acuity: 3 })

    let valid = new Assignment();
    valid.totalAcuity = 7;

    let invalid = new Assignment();
    invalid.totalAcuity = 8;

  it('limits the assignment to "n" acuity.', () => {
    expect(constraints.test(patient, valid)).toBe(true);
    expect(constraints.test(patient, invalid)).toBe(false);
  });
});
