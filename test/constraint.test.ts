import { describe, expect, it } from 'vitest'

import { Status } from '../modules/status.ts'
import { Bed } from '../modules/bed.ts'
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

describe('Constraint.maxPatientsForMS()', () => {
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

describe('Constraint.maxTotalAcuity()', () => {
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

describe('Constraint.distinctRooms()', () => {
  let constraint = Constraint.distinctRooms();
  let patient = new Patient({ acuity: 3, status: Status.MS, bed: new Bed(1,1) });

  let valid = new Assignment().addPatient(
    new Patient({ acuity: 3, status: Status.MS, bed: new Bed(2,1) }));

  let invalid = new Assignment().addPatient(
    new Patient({ acuity: 3, status: Status.MS, bed: new Bed(1,2) }));

  it('limits the assignment to one patient per room.', () => {
    expect(constraint.test(patient, valid)).toBe(true);
    expect(constraint.test(patient, invalid)).toBe(false);
  });
});

describe('Constraint.exclusiveBeds()', () => {
  let b1 = new Bed(1,1);
  let b2 = new Bed(2,2);
  let b3 = new Bed(3,3);
  let bx = new Bed(4,4);

  let constraint = Constraint.exclusiveBeds(b1, b2, b3);
  let p1 = new Patient({ bed: b1 });
  let p2 = new Patient({ bed: b2 });

  let valid = new Assignment().addPatient(
    new Patient({ acuity: 3, status: Status.MS, bed: bx }));

  let invalid = new Assignment().addPatient(
    new Patient({ acuity: 3, status: Status.MS, bed: b3 }));

  it('limits the assignment to one patient per exclusive beds.', () => {
    expect(constraint.test(p1, valid)).toBe(true);
    expect(constraint.test(p2, valid)).toBe(true);
    expect(constraint.test(p1, invalid)).toBe(false);
    expect(constraint.test(p2, invalid)).toBe(false);
  });
});
