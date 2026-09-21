import { Status } from "./status.js"
import * as T from "./types.js"

export class Patient {
  static sortByAcuityDesc(p: Patient[]): Patient[] {
    return p.sort((p1,p2) => p2.acuity - p1.acuity);
  }

  room: T.RoomNumber;
  bed: T.BedNumber;
  status: Status;
  acuity: T.Acuity;

  constructor({
    room = T.asRoomNumber(0),
    bed = T.asBedNumber(0),
    status = Status.MS,
    acuity = T.asAcuity(0),
  }) {
    this.room = room;
    this.bed = bed;
    this.status = status;
    this.acuity = acuity;
  }
}
