import * as T from "./types.js"

import { BedStatus } from "./bed_status.js"
import { Patient } from "./patient.js"

export class Bed {

  static fromString(s: string): Bed {
    let [rs,bs] = s.split("-");
    let rn = Number.parseInt(rs);
    let bn = Number.parseInt(bs);

    if (isNaN(rn)) { throw new Error(`Cannot parse bed number from "${s}".`); }
    return new Bed(T.asRoomNumber(rn), T.asBedNumber(bn));
  }

  readonly roomNumber: T.RoomNumber;
  readonly bedNumber?: T.BedNumber;
  readonly status: BedStatus;
  readonly patient?: Patient;

  constructor({
    room,
    bed,
    status,
    patient,
  }: {
    room: T.RoomNumber,
    bed: T.BedNumber,
    status: BedStatus,
    patient: Patient
  }) {
    this.roomNumber = room;
    this.bedNumber = bed;
    this.status = status;
    this.patient = patient;
  }

  label(): string {
    if (isNaN(this.bedNumber)) {
      return `${this.roomNumber}`;
    } else {
      return `${this.roomNumber}-${this.bedNumber}`;
    }
  }

  isSameBedAs(b: Bed): boolean {
    return this.roomNumber == b.roomNumber && this.bedNumber == b.bedNumber;
  }

  isSameRoomAs(b: Bed): boolean {
    return this.roomNumber == b.roomNumber;
  }

}
