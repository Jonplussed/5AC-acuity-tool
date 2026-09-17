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

export const create = ({
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
  return p.sort(compareAcuityDesc);
}

const compareAcuityDesc = (p1: Patient, p2: Patient): number => {
  return p2.acuity - p1.acuity;
}
