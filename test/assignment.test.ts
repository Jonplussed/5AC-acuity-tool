import { assertType, beforeEach, describe, expect, it } from 'vitest'

import * as S from '../modules/status.ts'
import * as P from '../modules/patient.ts'
import * as A from '../modules/assignment.ts'

describe('empty()', () => {
  let a = A.empty();

  it('is a new, readonly assignment', () => {
    assertType<A.Assignment>(a);
  });
});


describe('insert()', () => {
  let a;
  let p1 = P.create({ room: 1, acuity: 4, status: S.Status.MS });
  let p2 = P.create({ room: 2, acuity: 9, status: S.Status.IMC });

  beforeEach(() => {
    a = A.empty();
  });

  describe('with one patient', () => {
    beforeEach(() => {
      A.insert(a, p1);
    });

    it('adds the patients to the patients array', () => {
      expect(a.patients).toEqual([p1]);
    });

    it('updates the total patients', () => {
      expect(a.totalPatients).toBe(1);
    });

    it('updates the total acuity', () => {
      expect(a.totalAcuity).toBe(4);
    });

    it('updates the highest status', () => {
      expect(a.highestStatus).toBe(S.Status.MS);
    });
  });

  describe('with two patients', () => {
    beforeEach(() => {
      A.insert(a, p2);
      A.insert(a, p1);
    });

    it('adds the patients to the patients array', () => {
      expect(a.patients).toEqual([p2, p1]);
    });

    it('updates the total patients', () => {
      expect(a.totalPatients).toBe(2);
    });

    it('updates the total acuity', () => {
      expect(a.totalAcuity).toBe(13);
    });

    it('updates the highest status', () => {
      expect(a.highestStatus).toBe(S.Status.IMC);
    });
  });
});
