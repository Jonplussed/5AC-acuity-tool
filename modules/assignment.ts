import * as T from "./types.js"
import * as S from "./status.js"
import * as P from "./patient.js"

export type PatientCount = T.Newtype<number, "PatientCount">;
export const asPatientCount = (x: number) => x as PatientCount;

export interface Assignment {
  patients: P.Patient[],

  // Computed attributes for ease and efficiency.
  // Use Readonly<T> and Writable<T> to prevent mutation.
  highestStatus: S.Status,
  totalPatients: PatientCount,
  totalAcuity: number,
}

export const empty = (): Readonly<Assignment> => {
  return {
    patients: [],
    highestStatus: S.Status.MS,
    totalPatients: asPatientCount(0),
    totalAcuity: P.asAcuity(0),
  };
}

// Mutates the assignment in place. Would love to avoid mutable state in a
// future iteration.
export const insert = (a: T.Writable<Assignment>, p: P.Patient): Readonly<Assignment> => {
  a.patients.push(p);
  a.totalPatients ++;
  a.highestStatus = S.highest(p.status, a.highestStatus);
  a.totalAcuity += p.acuity;
  return a;
}

