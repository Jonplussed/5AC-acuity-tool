import { scooch } from "./array.js"
import { Patient } from "./patient.js"
import { Assignment } from "./assignment.js"

import * as T from "./types.js"
import * as S from "./status.js"

import { Constraints } from "./constraint.js"

export interface Roster {
  assignmentCount: T.AssignmentCount,
  assignments: Assignment[],
}

export const empty = (n: T.AssignmentCount): Roster => {
  return {
    assignmentCount: n,
    assignments: Array.from({ length: n }, () => new Assignment()),
  };
}

export const fill = (roster: Roster, patientList: Patient[]): Roster => {
  let assign: Assignment
  let patient: Patient;
  let indexCurr: number;
  let indexNew: number;

  Patient.sortByAcuityAsc(patientList);

  while (patientList.length > 0) {
    patient = patientList.pop();
    indexCurr = findAssignIndex(patient, roster.assignments);
    assign = roster.assignments[indexCurr].insert(patient);
    indexNew = findAcuityAscIndex(assign.totalAcuity, roster.assignments);
    scooch(roster.assignments, indexCurr, indexNew);
  }

  return roster;
}

const constraints = Constraints.defaults();

// Return the index of the assignment that should receive the patient.
const findAssignIndex = (p: Patient, aa: Assignment[]): number => {
  let i = aa.findIndex((a) => constraints.test(p,a));

  // TODO: Gracefully degrade constraints until a suitable assignment is found.
  if (i < 0) { throw new Error(
    `Unable to find suitable assignment for patient ${p.room}-${p.bed}.`
  ); }

  return i;
}

// Return the index of the first assignment with an acuity greater than the one
// provided, i.e. where we should splice in the current assignment to maintain
// order by acuity ascending.
const findAcuityAscIndex = (acuity: T.Acuity, assigns: Assignment[]): number => {
  let i = assigns.findIndex((a) => a.totalAcuity > acuity);
  if (i < 0) { return assigns.length - 1; }
  return i - 1; // Should be safe since "i" should never equal 0.
}
