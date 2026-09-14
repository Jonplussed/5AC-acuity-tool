import { Newtype } from "./newtype.js"
import * as S from "./status.js"
import * as P from "./patient.js"

export type PatientCount = Newtype<number, "PatientCount">;
export const asPatientCount = (x: number) => x as PatientCount;

const MAX_MS_PATIENT_COUNT = asPatientCount(4);
const MAX_IMC_PATIENT_COUNT = asPatientCount(3);
const MAX_ASSIGNMENT_ACUITY = P.asAcuity(11);

export interface Assignment {
  patients: P.Patient[],

  // These attributes could be computed on-the-fly, but we calculate on update
  // for ease and efficiency.
  patientCount: PatientCount,
  highestStatus: S.Status,
  totalAcuity: number,
}

export const emptyAssignment = (): Assignment => {
  return {
    patients: [],
    highestStatus: S.Status.MS,
    patientCount: asPatientCount(0),
    totalAcuity: P.asAcuity(0),
  }
}

export const hasMaxPatients = (p: P.Patient, a: Assignment): boolean => {
  switch (a.highestStatus) {
    case S.Status.MS:
      return a.patientCount >= MAX_MS_PATIENT_COUNT;
    case S.Status.IMC:
      return a.patientCount >= MAX_IMC_PATIENT_COUNT;
  }
}

export const hasMaxAcuity = (p: P.Patient, a: Assignment): boolean => {
  return a.totalAcuity >= MAX_ASSIGNMENT_ACUITY;
}
