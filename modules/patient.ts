import { Newtype } from "./newtype.js"
import * as S from "./status.js"

export type Acuity = Newtype<number, "Acuity">;
export const asAcuity = (x: number) => x as Acuity;

export type RoomNumber = Newtype<number, "RoomNumber">;
export const asRoomNumber = (x: number) => x as RoomNumber;

export type BedNumber = Newtype<number, "BedNumber">;
export const asBedNumber = (x: number) => x as BedNumber;

export interface Patient {
  room: RoomNumber,
  bed: BedNumber,
  status: S.Status,
  acuity: Acuity,
}

export const newPatient = ({
  room = asRoomNumber(0),
  bed = asBedNumber(0),
  status = S.Status.MS,
  acuity = asAcuity(0)
}: Patient): Patient => {
  return {
    room: room,
    bed: bed,
    status: status,
    acuity: acuity,
  }
}

export const sortByAcuityDesc = (p: Patient[]): Patient[] => {
  return p.toSorted(compareAcuityDesc);
}

const compareAcuityDesc = (p: Patient, q: Patient): number => {
  return q.acuity - p.acuity;
}
