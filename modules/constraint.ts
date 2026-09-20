import * as T from "./types.js"
import * as S from "./status.js"
import * as P from "./patient.js"
import * as A from "./assignment.js"

const MAX_MS_PATIENT_COUNT = T.asPatientCount(4);
const MAX_IMC_PATIENT_COUNT = T.asPatientCount(3);
const MAX_ASSIGNMENT_ACUITY = T.asAcuity(10);

export const isValidPatientCount = (p: P.Patient, a: A.Assignment): boolean => {
  let limit = maxPatients(S.highest(p.status, a.highestStatus));
  let total = a.totalPatients;
  return total < limit;
}

export const isValidAcuity = (p: P.Patient, a: A.Assignment): boolean => {
  let total = p.acuity + a.totalAcuity;
  return total <= MAX_ASSIGNMENT_ACUITY;
}

export const constraints = [
  isValidPatientCount,
  isValidAcuity,
]

const maxPatients = (s: S.Status): T.PatientCount => {
  switch (s) {
    case S.Status.MS: { return MAX_MS_PATIENT_COUNT; }
    case S.Status.IMC: { return MAX_IMC_PATIENT_COUNT; }
  }
}
