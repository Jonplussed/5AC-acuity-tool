import * as T from "./types.js"

import { PatientStatus } from "./patient_status.js"

export class Patient {

  static sortByAcuityDesc(p: Patient[]): Patient[] {
    return p.sort((p1,p2) => p2.acuity - p1.acuity);
  }

  readonly status: PatientStatus;
  readonly acuity: T.Acuity;

  constructor(status: PatientStatus, acuity: T.Acuity) {
    this.status = status;
    this.acuity = acuity;
  }

}
