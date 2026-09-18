import { Newtype } from "./types.js"
import * as S from "./status.js"
import * as P from "./patient.js"
import * as A from "./assignment.js"

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


