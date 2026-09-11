import * as S from "./status.ts"

type Patient = {
  acuity: number;
  room: string;
  status: S.Status;
}

const sortByAcuity = function(p: Patient, q: Patient): number {
  return p.acuity - q.acuity;
}
