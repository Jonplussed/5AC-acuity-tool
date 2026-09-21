import * as T from "./types.js"

import { Status } from "./status.js"
import { Patient } from "./patient.js"
import { Assignment } from "./assignment.js"

const MAX_MS_PATIENT_COUNT = T.asPatientCount(4);
const MAX_IMC_PATIENT_COUNT = T.asPatientCount(3);
const MAX_ASSIGNMENT_ACUITY = T.asAcuity(10);

export const isValidPatientCount = (p: Patient, a: Assignment): boolean => {
  let limit = maxPatients(Status.highest(p.status, a.highestStatus));
  let total = a.totalPatients;
  return total < limit;
}

export const isValidAcuity = (p: Patient, a: Assignment): boolean => {
  let total = p.acuity + a.totalAcuity;
  return total <= MAX_ASSIGNMENT_ACUITY;
}

export const constraints = [
  isValidPatientCount,
  isValidAcuity,
]

const maxPatients = (s: Status): T.PatientCount => {
  switch (s) {
    case Status.MS: { return MAX_MS_PATIENT_COUNT; }
    case Status.IMC: { return MAX_IMC_PATIENT_COUNT; }
  }
}
