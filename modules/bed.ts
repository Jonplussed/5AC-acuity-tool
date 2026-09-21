import * as T from "./types.js"

export class Bed {

  static fromString(s: string): Bed {
    let [rs,bs] = s.split("-");
    let rn = Number.parseInt(rs);
    let bn = Number.parseInt(bs);

    if (isNaN(rn)) { throw new Error(`Cannot parse bed number from "${s}".`); }
    return new Bed(T.asRoomNumber(rn), T.asBedNumber(bn));
  }

  readonly roomNumber: T.RoomNumber;
  readonly bedNumber: T.BedNumber;

  constructor(r: T.RoomNumber, b: T.BedNumber) {
    this.roomNumber = r;
    this.bedNumber = b;
  }

  label(): string {
    if (isNaN(this.bedNumber)) {
      return `${this.roomNumber}`;
    } else {
      return `${this.roomNumber}-${this.bedNumber}`;
    }
  }

  isSameRoomAs(b: Bed): boolean {
    return this.bedNumber == b.bedNumber;
  }

}
