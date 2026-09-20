import { assertType, beforeEach, describe, expect, it } from 'vitest'

import * as S from '../modules/status.ts'
import { Patient } from '../modules/patient.ts'
import { Assignment } from '../modules/assignment.ts'

describe('new Assignment()', () => {
  let a = new Assignment();

  it('has no patients', () => {
    expect(a.patients().length).toBe(0);
    expect(a.totalPatients()).toBe(0);
    expect(a.totalAcuity()).toBe(0);
  });
});

describe('insert()', () => {
  let a: Assignment;
  let p1 = new Patient({ room: 1, acuity: 4, status: S.Status.MS });
  let p2 = new Patient({ room: 2, acuity: 9, status: S.Status.IMC });

  beforeEach(() => {
    a = new Assignment();
  });

  describe('with one patient', () => {
    beforeEach(() => {
      a.insert(p1);
    });

    it('adds the patients to the patients array', () => {
      expect(a.patients()).toEqual([p1]);
    });

    it('updates the total patients', () => {
      expect(a.totalPatients()).toBe(1);
    });

    it('updates the total acuity', () => {
      expect(a.totalAcuity()).toBe(4);
    });

    it('updates the highest status', () => {
      expect(a.highestStatus()).toBe(S.Status.MS);
    });
  });

  describe('with two patients', () => {
    beforeEach(() => {
      a.insert(p2);
      a.insert(p1);
    });

    it('adds the patients to the patients array', () => {
      expect(a.patients()).toEqual([p2, p1]);
    });

    it('updates the total patients', () => {
      expect(a.totalPatients()).toBe(2);
    });

    it('updates the total acuity', () => {
      expect(a.totalAcuity()).toBe(13);
    });

    it('updates the highest status', () => {
      expect(a.highestStatus()).toBe(S.Status.IMC);
    });
  });
});
