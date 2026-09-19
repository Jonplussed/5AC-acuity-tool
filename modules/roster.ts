import { Newtype } from "./types.js"

import * as S from "./status.js"
import * as P from "./patient.js"
import * as A from "./assignment.js"
import * as C from "./constraint.js"

export type AssignmentCount = Newtype<number, "AssignmentCount">;
export const asAssignmentCount = (x: number) => x as AssignmentCount;

export interface Roster {
  assignmentCount: AssignmentCount,
  assignments: A.Assignment[],
}

export const empty = (n: AssignmentCount): Roster => {
  return {
    assignmentCount: asAssignmentCount(n),
    assignments: Array.from({ length: n }, () => A.empty()),
  };
}

export const fill = (r: Roster, ps: P.Patient[]): Roster => {
  // 1. Sort patients from lowest to highest acuity.
  P.sortByAcuityAsc(ps);

  // 2. Give each assignment one patient to start. This results in an array of
  // assignments sorted by acuity ascending.
  for (let i = r.assignments.length - 1; i >= 0; i--) {
    if (ps.length <= 0) { break; }
    A.insert(r.assignments[i], ps.pop());
  }

  let a: A.Assignment
  let p: P.Patient;
  let i: number;

  while (ps.length > 0) {
    // 3. Assign each patient to the first assignment that passes all
    // constraints.
    p = ps.pop();
    i = findAssignIndex(p, r.assignments);
    a = A.insert(r.assignments[i], p);

    // 4. After assigning a patient, move the assignment in the roster such
    // that the assignments remain in order of total acuity ascending.
    r.assignments = r.assignments.slice(i-1).concat(r.assignments.slice(-i));
    i = findAcuityAscIndex(a.totalAcuity, r.assignments);
    r.assignments.splice(i, 0, a);
  }

  return r;
}

// Return the index of the assignment that should receive the patient.
const findAssignIndex = (p: P.Patient, aa: A.Assignment[]): number => {
  let i = aa.findIndex((a) => C.constraints.every((f) => f(p,a)));

  if (i < 0) { throw new Error(
    `Unable to find suitable assignment for patient ${p.room}-${p.bed}.`
  ); }

  return i;
}

// Return the index of the first assignment with an acuity greater than the one
// provided, i.e. where we should splice in the current assignment to maintain
// order by acuity ascending.
const findAcuityAscIndex = (n: P.Acuity, aa: A.Assignment[]): number => {
  let i = aa.findIndex((a) => a.totalAcuity > n);
  if (i < 0) { return aa.length; }
  return i;
}
