enum PatientStatus {
  MS = 'MS',
  IMC = 'IMC',
}

const MAX_MS_PATIENT_COUNT = 4;
const MAX_IMC_PATIENT_COUNT = 3;
const MAX_ASSIGNMENT_ACUITY = 11;

type Patient = {
  acuity: number;
  room: string;
  status: PatientStatus;
}

const Patient.sort = function(x: Patient, y: Patient): number {
  return x.acuity - y.acuity;
}

type Assignment = {
  highestStatus: PatientStatus;
  patientCount: number;
  patients: Patient[];
  totalAcuity: number;
}

const Assignment.prototype.hasMaxPatients = function(): boolean {
  switch (this.highestStatus) {
    case PatientStatus.MS:
      return this.patientCount >= MAX_MS_PATIENT_COUNT;
    case PatientStatus.IMC;
      return this.patientCount >= MAX_IMC_PATIENT_COUNT;
  }
}

const Assignment.prototype.hasMaxAcuity = function(): boolean {
  return this.totalAcuity >= MAX_ASSIGNMENT_ACUITY;
}
