import * as T from "./types.js"
import * as S from "./status.js"

export class Patient {
  static sortByAcuityAsc = (p: Patient[]): Patient[] => {
    return p.sort(compareAcuityAsc);
  }

  room: T.RoomNumber;
  bed: T.BedNumber;
  status: S.Status;
  acuity: T.Acuity;

  constructor({
    room = T.asRoomNumber(0),
    bed = T.asBedNumber(0),
    status = S.Status.MS,
    acuity = T.asAcuity(0),
  }) {
    this.room = room;
    this.bed = bed;
    this.status = status;
    this.acuity = acuity;
  }
}

const compareAcuityAsc = (p1: Patient, p2: Patient): number => {
  return p1.acuity - p2.acuity;
}
