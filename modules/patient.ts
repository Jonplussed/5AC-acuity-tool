import * as S from "./status.js"

export type Patient = {
  acuity: number;
  room: string;
  status: S.Status;
}

export const sortByAcuity = function(p: Patient, q: Patient): number {
  return p.acuity - q.acuity;
}
