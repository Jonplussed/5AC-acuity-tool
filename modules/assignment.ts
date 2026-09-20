import * as T from "./types.js"
import * as S from "./status.js"

import { Patient } from "./patient.js"

export class Assignment {
  private _patients: Patient[];
  private _highestStatus: S.Status;
  private _totalPatients: T.PatientCount;
  private _totalAcuity: T.Acuity;

  constructor() {
    this._patients = [];
    this._highestStatus = S.Status.MS;
    this._totalPatients = T.asPatientCount(0);
    this._totalAcuity = T.asAcuity(0);
  }

  patients(): Patient[] { return this._patients; }
  highestStatus(): S.Status { return this._highestStatus; }
  totalPatients(): T.PatientCount { return this._totalPatients; }
  totalAcuity(): T.Acuity { return this._totalAcuity; }

  insert(...patients: Patient[]): Assignment {
    for (let p of patients) {
      this._patients.push(p);
      this._totalPatients ++;
      this._highestStatus = S.highest(p.status, this._highestStatus);
      this._totalAcuity = T.asAcuity(this._totalAcuity + p.acuity);
    }

    return this;
  }
}

