import * as T from "./types.js"

import { Constraint } from "./constraint.ts"
import { Patient } from "./patient.js"
import { Assignment } from "./assignment.js"

// TODO: Degrade constraints from lowest to highest priority when a patient
// fails all assignments.
export class ConstraintsList {

  static defaults(): ConstraintsList {
    return new ConstraintsList()
      .add(Constraint.maxPatientsForIMC(T.asPatientCount(3)))
      .add(Constraint.maxPatientsForMS(T.asPatientCount(4)))
      .add(Constraint.maxTotalAcuity(T.asAcuity(10)))
      .add(Constraint.distinctRooms());
  }

  readonly list: Constraint[];

  constructor() {
    this.list = [];
  }

  add(c: Constraint): ConstraintsList {
    this.list.push(c);
    return this;
  }

  test(p: Patient, a: Assignment): boolean {
    return this.list.every((c) => c.test(p,a));
  }

}
