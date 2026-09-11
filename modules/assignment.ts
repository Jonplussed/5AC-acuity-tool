import * as S from "./status.ts"
import * as P from "./patient.ts"

const MAX_MS_PATIENT_COUNT = 4;
const MAX_IMC_PATIENT_COUNT = 3;
const MAX_ASSIGNMENT_ACUITY = 11;

export type Assignment = {
  highestStatus: S.Status;
  patientCount: number;
  patients: P.Patient[];
  totalAcuity: number;
}

export const hasMaxPatients = function(a: Assignment): boolean {
  switch (a.highestStatus) {
    case PatientStatus.MS:
      return a.patientCount >= MAX_MS_PATIENT_COUNT;
    case PatientStatus.IMC;
      return a.patientCount >= MAX_IMC_PATIENT_COUNT;
  }
}

export const hasMaxAcuity = function(a: Assignment): boolean {
  return a.totalAcuity >= MAX_ASSIGNMENT_ACUITY;
}
