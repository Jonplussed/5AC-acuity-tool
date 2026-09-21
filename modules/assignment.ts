import * as T from "./types.js"

import { Status } from "./status.js"
import { Patient } from "./patient.js"

export class Assignment {
  readonly patients: Patient[];

  // Internal properties. These could be computed on-the-fly but are tracked
  // for efficiency.
  private _highestStatus: Status;
  private _totalPatients: T.PatientCount;
  private _totalAcuity: T.Acuity;

  constructor() {
    this.patients = [];

    this._highestStatus = Status.MS;
    this._totalPatients = T.asPatientCount(0);
    this._totalAcuity = T.asAcuity(0);
  }

  private set highestStatus(x) { this._highestStatus = x; }
  public get highestStatus() { return this._highestStatus; }

  private set totalPatients(x) { this._totalPatients = x; }
  public get totalPatients() { return this._totalPatients; }

  private set totalAcuity(x) { this._totalAcuity = x; }
  public get totalAcuity() { return this._totalAcuity; }

  insert(...patients: Patient[]): Assignment {
    for (let p of patients) {
      this.patients.push(p);
      this.totalPatients ++;
      this.highestStatus = Status.highest(p.status, this._highestStatus);
      this.totalAcuity = T.asAcuity(this.totalAcuity + p.acuity);
    }

    return this;
  }
}

