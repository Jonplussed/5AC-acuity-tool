import * as S from "./status.js"

export type Patient = {
  acuity: number,
  roomNum: number,
  bedNum: number,
  status: S.Status,
}

const compareAcuityDesc = function(p: Patient, q: Patient): number {
  return q.acuity - p.acuity;
}

export const sortByAcuityDesc = function(p: Patient[]): Patient[] {
  return p.toSorted(compareAcuityDesc);
}
