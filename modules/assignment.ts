import { Newtype } from "./newtype.js"
import * as S from "./status.js"
import * as P from "./patient.js"

export type PatientCount = Newtype<number, "PatientCount">;
export const asPatientCount = (x: number) => x as PatientCount;

const MAX_MS_PATIENT_COUNT = asPatientCount(4);
const MAX_IMC_PATIENT_COUNT = asPatientCount(3);
const MAX_ASSIGNMENT_ACUITY = P.asAcuity(10);

export interface Assignment {
  patients: P.Patient[],

  // These attributes could be computed on-the-fly, but we calculate on update
  // for ease and efficiency.
  highestStatus: S.Status,
  totalPatients: PatientCount,
  totalAcuity: number,
}

export const newAssignment = ({
  patients = [],
  highestStatus = S.Status.MS,
  totalPatients = asPatientCount(0),
  totalAcuity = P.asAcuity(0),
}: Assignment): Assignment => {
  return {
    patients: patients,
    highestStatus: highestStatus,
    totalPatients: totalPatients,
    totalAcuity: totalAcuity,
  }
}

const maxPatients = (s: S.Status): PatientCount => {
  switch (s) {
    case S.Status.MS: { return MAX_MS_PATIENT_COUNT; }
    case S.Status.IMC: { return MAX_IMC_PATIENT_COUNT; }
  }
}

export const isValidPatientCount = (p: P.Patient, a: Assignment): boolean => {
  let limit = maxPatients(S.highest(p.status, a.highestStatus));
  let total = a.totalPatients;
  return total < limit;
}

export const isValidAcuity = (p: P.Patient, a: Assignment): boolean => {
  let total = p.acuity + a.totalAcuity;
  return total <= MAX_ASSIGNMENT_ACUITY;
}
