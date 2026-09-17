import { Newtype } from "./newtype.js"
import * as S from "./status.js"
import * as P from "./patient.js"

export type PatientCount = Newtype<number, "PatientCount">;
export const asPatientCount = (x: number) => x as PatientCount;

export interface Assignment {
  patients: P.Patient[],
  // These attributes could be computed on-the-fly, but we calculate on update
  // for ease and efficiency.
  highestStatus: S.Status,
  totalPatients: PatientCount,
  totalAcuity: number,
}

export const empty = (): Assignment => {
  return {
    patients: [],
    highestStatus: S.Status.MS,
    totalPatients: asPatientCount(0),
    totalAcuity: P.asAcuity(0),
  };
}

// Mutates the assignment in place. Would love to avoid mutable state in a
// future iteration.
export const insert = (a: Assignment, p: P.Patient): Assignment => {
  a.patients.push(p);
  a.totalPatients ++;
  a.highestStatus = S.highest(p.status, a.highestStatus);
  a.totalAcuity += p.acuity;
  return a;
}
