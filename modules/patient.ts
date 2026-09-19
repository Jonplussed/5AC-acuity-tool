import { Newtype } from "./types.js"
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

export const sortByAcuityAsc = (p: Patient[]): Patient[] => {
  return p.sort(compareAcuityAsc);
}

const compareAcuityAsc = (p1: Patient, p2: Patient): number => {
  return p1.acuity - p2.acuity;
}
