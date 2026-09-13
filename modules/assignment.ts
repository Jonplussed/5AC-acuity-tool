import * as S from "./status.js"
import * as P from "./patient.js"

const MAX_MS_PATIENT_COUNT = 4;
const MAX_IMC_PATIENT_COUNT = 3;
const MAX_ASSIGNMENT_ACUITY = 11;

export type Assignment = {
  patients: P.Patient[],
  highestStatus: S.Status, // keep track in a future iteration
  patientCount: number,    // keep track in a future iteration
  totalAcuity: number,     // keep track in a future iteration
}

// const highestStatus = function(a: Assig Assignment): S.status {
  
// }

export const hasMaxPatients = function(a: Assignment): boolean {
  switch (a.highestStatus) {
    case S.Status.MS:
      return a.patientCount >= MAX_MS_PATIENT_COUNT;
    case S.Status.IMC:
      return a.patientCount >= MAX_IMC_PATIENT_COUNT;
  }
}

export const hasMaxAcuity = function(a: Assignment): boolean {
  return a.totalAcuity >= MAX_ASSIGNMENT_ACUITY;
}
