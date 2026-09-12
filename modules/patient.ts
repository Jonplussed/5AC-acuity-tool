import * as S from "./status.js"

export type Patient = {
  acuity: number;
  room: string;
  status: S.Status;
}

const compDesc = function(p: Patient, q: Patient): number {
  return p.acuity - q.acuity;
}

export const sortByAcuity(p: Patient[]): Patient[] {
  return p.toSorted(compDesc);
}
