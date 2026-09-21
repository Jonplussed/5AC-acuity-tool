import * as T from "./types.js"

import { scooch } from "./array.js"
import { Patient } from "./patient.js"
import { Assignment } from "./assignment.js"
import { Constraints } from "./constraint.js"

export class Roster {

  readonly assignments: Assignment[];
  readonly constraints: Constraints;

  constructor(count: number, constraints = Constraints.defaults()) {
    this.assignments = Array.from({ length: count }, () => new Assignment()),
    this.constraints = constraints;
  }

  fill(ps: Patient[]): Roster {
    let a: Assignment
    let i: number;
    let j: number;

    for (let p of Patient.sortByAcuityDesc(ps)) {
      i = this.findAssignmentIndex(p);
      a = this.assignments[i].insert(p);
      j = this.findHigherAcuityIndex(a.totalAcuity);
      scooch(this.assignments, i, j);
    }

    return this;
  }

  private findAssignmentIndex = (p: Patient): number => {
    let i = this.assignments.findIndex((a) => this.constraints.test(p,a));

    // TODO: Gracefully degrade constraints until a suitable assignment is found.
    if (i < 0) { throw new Error(
      `Unable to find suitable assignment for patient ${p.room}-${p.bed}.`
    ); }

    return i;
  }

  private findHigherAcuityIndex = (acuity: T.Acuity): number => {
    let i = this.assignments.findIndex((a) => a.totalAcuity > acuity);
    if (i < 0) { return this.assignments.length - 1; }
    return i - 1; // Should be safe since "i" should never equal 0.
  }

}
