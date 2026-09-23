import { describe, expect, it } from 'vitest'

import { Status } from '../modules/status.ts'
import { Patient } from '../modules/patient.ts'
import { Assignment } from '../modules/assignment.ts'
import { Constraint } from '../modules/constraint.ts'

describe('Constraint.maxPatientsForIMC()', () => {
  let constraint = Constraint.maxPatientsForIMC(3);

  describe('when the patient is IMC', () => {
    let patient = new Patient({ status: Status.IMC })

    let valid = new Assignment();
    valid.totalPatients = 2;

    let invalid = new Assignment();
    invalid.totalPatients = 3;

    it('limits the assignment to "n" patients.', () => {
      expect(constraint.test(patient, valid)).toBe(true);
      expect(constraint.test(patient, invalid)).toBe(false);
    });
  });

  describe('when the patient is MS', () => {
    let patient = new Patient({ status: Status.MS })
    let valid = new Assignment();
    valid.totalPatients = 1000;

    it('is always true', () => {
      expect(constraint.test(patient, valid)).toBe(true);
    });
  });
});

describe('maxPatientsForMS()', () => {
  let constraint = Constraint.maxPatientsForMS(4);

  describe('when the patient is IMC', () => {
    let patient = new Patient({ status: Status.IMC })
    let valid = new Assignment();
    valid.totalPatients = 1000;

    it('is always true', () => {
      expect(constraint.test(patient, valid)).toBe(true);
    });
  });

  describe('when the patient is MS', () => {
    let patient = new Patient({ status: Status.MS })

    let valid = new Assignment();
    valid.totalPatients = 3;

    let invalid = new Assignment();
    invalid.totalPatients = 4;

    it('limits the assignment to "n" patients.', () => {
      expect(constraint.test(patient, valid)).toBe(true);
      expect(constraint.test(patient, invalid)).toBe(false);
    });
  });
});

describe('maxTotalAcuity()', () => {
    let constraint = Constraint.maxTotalAcuity(10);
    let patient = new Patient({ acuity: 3 })

    let valid = new Assignment();
    valid.totalAcuity = 7;

    let invalid = new Assignment();
    invalid.totalAcuity = 8;

  it('limits the assignment to "n" acuity.', () => {
    expect(constraint.test(patient, valid)).toBe(true);
    expect(constraint.test(patient, invalid)).toBe(false);
  });
});
