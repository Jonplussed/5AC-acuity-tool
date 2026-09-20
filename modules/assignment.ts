import * as T from "./types.js"
import * as S from "./status.js"

import { Patient }from "./patient.js"

export interface Assignment {
  patients: Patient[],

  // Computed attributes for ease and efficiency.
  // Use Readonly<T> and Writable<T> to prevent mutation.
  highestStatus: S.Status,
  totalPatients: T.PatientCount,
  totalAcuity: T.Acuity,
}

export const empty = (): Readonly<Assignment> => {
  return {
    patients: [],
    highestStatus: S.Status.MS,
    totalPatients: T.asPatientCount(0),
    totalAcuity: T.asAcuity(0),
  };
}

// TODO: Can this be performant while avoiding mutable state?
export const insert = (a: T.Writable<Assignment>, ...ps: Patient[]): Readonly<Assignment> => {
  for (let p of ps) {
    a.patients.push(p);
    a.totalPatients ++;
    a.highestStatus = S.highest(p.status, a.highestStatus);
    a.totalAcuity = T.asAcuity(a.totalAcuity + p.acuity);
  }

  return a;
}

