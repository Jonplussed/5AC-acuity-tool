import { describe, expect, test } from 'vitest'
import * as S from '../modules/status.ts'
import * as P from '../modules/patient.ts'
import * as A from '../modules/assignment.ts'

describe('insert()', () => {
  let a = A.empty();
  let p1 = P.create({ room: 1, acuity: 4, status: S.Status.MS });
  let p2 = P.create({ room: 2, acuity: 9, status: S.Status.IMC });

  describe('with one patient', () => {
    A.insert(a, p1);

    describe('adds the patients to the patients array', () => {
      expect(a.patients).toBe([p1]);
    });

    describe('updates the total patients', () => {
      expect(a.totalPatients).toBe(1);
    });

    describe('updates the total acuity', () => {
      expect(a.totalAcuity).toBe(4);
    });

    describe('updates the highest status', () => {
      expect(a.totalPatients).toBe(S.Status.MS);
    });
  });

  describe('with two patients', () => {
    A.insert(a, p2);
    A.insert(a, p1);

    describe('adds the patients to the patients array', () => {
      expect(a.patients).toBe([p2, p1]);
    });

    describe('updates the total patients', () => {
      expect(a.totalPatients).toBe(2);
    });

    describe('updates the total acuity', () => {
      expect(a.totalAcuity).toBe(13);
    });

    describe('updates the highest status', () => {
      expect(a.totalPatients).toBe(2);
    });
  });
});
