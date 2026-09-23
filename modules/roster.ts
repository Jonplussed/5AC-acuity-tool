import * as T from "./types.js"

import { scooch } from "./array.js"
import { Patient } from "./patient.js"
import { Assignment } from "./assignment.js"
import { Constraint } from "./constraint.js"
import { ConstraintsList } from "./constraints_list.js"

export class Roster {

  readonly assignments: Assignment[];
  readonly constraints: ConstraintsList;

  constructor({
    count,
    constraints = ConstraintsList.defaults(),
  }: {
    count: T.AssignmentCount,
    constraints: ConstraintsList,
  }) {
    this.assignments = Array.from({ length: count }, () => new Assignment());
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
      `No possible assignment for patient ${p.bed.label()}.`
    ); }

    return i;
  }

  private findHigherAcuityIndex = (acuity: T.Acuity): number => {
    let i = this.assignments.findIndex((a) => a.totalAcuity > acuity);
    if (i < 0) { return this.assignments.length - 1; }
    return i - 1; // Should be safe since "i" should never equal 0.
  }

}
