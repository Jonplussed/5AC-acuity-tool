import * as T from "./types.js"

import { Bed } from "./bed.js"
import { Status } from "./status.js"
import { Patient } from "./patient.js"
import { Assignment } from "./assignment.js"

type Condition = (p: Patient, a: Assignment) => boolean;

export class Constraint {

  static maxPatientsForIMC(n: T.PatientCount): Constraint {
    return new Constraint("MAX_PATIENTS_FOR_IMC", (p: Patient, a: Assignment) => {
      if (Status.highest(p.status, a.highestStatus) == Status.IMC) {
        return a.totalPatients < n;
      } else {
        return true;
      }
    });
  }

  static maxPatientsForMS(n: T.PatientCount): Constraint {
    return new Constraint("MAX_PATIENTS_FOR_MS", (p: Patient, a: Assignment) => {
      if (Status.highest(p.status, a.highestStatus) == Status.MS) {
        return a.totalPatients < n;
      } else {
        return true;
      }
    });
  }

  static maxTotalAcuity(n: T.Acuity): Constraint {
    return new Constraint("MAX_TOTAL_ACUITY", (p: Patient, a: Assignment) => {
      return (p.acuity + a.totalAcuity) <= n;
    });
  }

  static distinctRooms(): Constraint {
    return new Constraint("DISTINCT_ROOMS", (p: Patient, a: Assignment) => {
      return !a.patients.some((q) => p.bed.isSameRoomAs(q.bed));
    });
  }

  static exclusiveBeds(...beds: Bed[]): Constraint {
    return new Constraint("EXCLUSIVE_BEDS", (p: Patient, a: Assignment) => {
      if (beds.some((b) => p.bed.isSameBedAs(b))) {
        for (let q of a.patients) {
          if (beds.some((b) => q.bed.isSameBedAs(b))) {
            return false;
          }
        }
      }

      return true;
    });
  }

  readonly label: string;
  readonly condition: Condition;

  constructor(label: string, condition: Condition) {
    this.label = label;
    this.condition = condition;
  }

  test(p: Patient, a: Assignment): boolean {
    return this.condition(p,a);
  }

}

