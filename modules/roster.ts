import { Newtype } from "./types.js"
import { scooch } from "./array.js"

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

export const fill = (roster: Roster, patientList: P.Patient[]): Roster => {
  // 1. Sort patients from lowest to highest acuity.
  P.sortByAcuityAsc(patientList);
  // 2. Give each assignment one patient to start. This results in an array of
  // assignments sorted by acuity ascending.
  fillInitial(roster, patientList);
  // 3. Assign each patient to the first assignment that passes all
  // constraints. Reorder assignments to remain sorted.
  fillRemaining(roster, patientList);
  return roster;
}

// Return the index of the assignment that should receive the patient.
const findAssignIndex = (p: P.Patient, aa: A.Assignment[]): number => {
  let i = aa.findIndex((a) => C.constraints.every((f) => f(p,a)));

  // TODO: Gracefully degrade constraints until a suitable assignment is found.
  if (i < 0) { throw new Error(
    `Unable to find suitable assignment for patient ${p.room}-${p.bed}.`
  ); }

  return i;
}

// Return the index of the first assignment with an acuity greater than the one
// provided, i.e. where we should splice in the current assignment to maintain
// order by acuity ascending.
const findAcuityAscIndex = (acuity: P.Acuity, assigns: A.Assignment[]): number => {
  let i = assigns.findIndex((a) => a.totalAcuity > acuity);
  if (i < 0) { return assigns.length - 1; }
  return i - 1; // Should be safe since "i" should never equal 0.
}

const fillInitial = (roster: Roster, patientList: P.Patient[]): P.Patient[] => {
  for (let i = roster.assignments.length - 1; i >= 0; i--) {
    if (patientList.length <= 0) { break; }
    A.insert(roster.assignments[i], patientList.pop());
  }

  return patientList;
}

const fillRemaining = (roster: Roster, patientList: P.Patient[]): P.Patient[]  => {
  let assign: A.Assignment
  let patient: P.Patient;
  let indexCurr: number;
  let indexNew: number;

  while (patientList.length > 0) {
    patient = patientList.pop();
    indexCurr = findAssignIndex(patient, roster.assignments);
    assign = A.insert(roster.assignments[indexCurr], patient);
    indexNew = findAcuityAscIndex(assign.totalAcuity, roster.assignments);
    scooch(roster.assignments, indexCurr, indexNew);
  }

  return patientList;
}
