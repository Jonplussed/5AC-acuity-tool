import * as T from "./types.js"

import { Status } from "./status.js"
import { Patient } from "./patient.js"
import { Assignment } from "./assignment.js"

export class Constraints {
  static defaults(): Constraints {
    return (new Constraints())
      .addMaxPatientsForIMC(3)
      .addMaxPatientsForMS(4)
      .addMaxTotalAcuity(10);
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

  test(p: Patient, a: Assignment): boolean {
    return this.list.every((f) => f(p,a));
  }
}

