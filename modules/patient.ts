import * as T from "./types.js"
import * as S from "./status.js"

export interface Patient {
  room: T.RoomNumber,
  bed: T.BedNumber,
  status: S.Status,
  acuity: T.Acuity,
}

// TODO: Probably not what we want to create patients from user data.
export const create = ({
  room = T.asRoomNumber(0),
  bed = T.asBedNumber(0),
  status = S.Status.MS,
  acuity = T.asAcuity(0)
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
