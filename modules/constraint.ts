import * as T from "./types.js"
import * as A from "./array.js"

import { Bed } from "./bed.js"
import { Status } from "./status.js"
import { Patient } from "./patient.js"
import { Assignment } from "./assignment.js"

export class Constraints {
  static defaults(): Constraints {
    return (new Constraints())
      .addMaxPatientsForIMC(3)
      .addMaxPatientsForMS(4)
      .addMaxTotalAcuity(10);
      // .addDistinctRooms();
  }

  private list: ((p: Patient, a: Assignment) => boolean)[];

  constructor() {
    this.list = [];
  }

  addMaxPatientsForIMC(n: number): Constraints {
    this.list.push((p,a) => {
      if (Status.highest(p.status, a.highestStatus) == Status.IMC) {
        return a.totalPatients < n;
      } else {
        return true;
      }
    });

    return this;
  }

  addMaxPatientsForMS(n: number): Constraints {
    this.list.push((p,a) => {
      if (Status.highest(p.status, a.highestStatus) == Status.MS) {
        return a.totalPatients < n;
      } else {
        return true;
      }
    });

    return this;
  }

  addMaxTotalAcuity(n: number): Constraints {
    this.list.push((p,a) => {
      return (p.acuity + a.totalAcuity) <= n;
    });

    return this;
  }

  addDistinctRooms(): Constraints {
    this.list.push((p,a) => {
      return !a.patients.some((q) => p.bed.isSameRoomAs(q.bed));
    });

    return this;
  }

  addExclusive(...beds: Bed[]): Constraints {
    this.list.push((p,a) => {
      if (beds.some((b) => p.bed == b)) {
        for (let q of a.patients) {
          if (beds.some((b) => q.bed == b)) { return false; }
        }
      }

      return true;
    });

    return this;
  }

  test(p: Patient, a: Assignment): boolean {
    return this.list.every((f) => f(p,a));
  }
}

