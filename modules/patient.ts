import * as T from "./types.js"

import { Bed } from "./bed.js"
import { Status } from "./status.js"

export class Patient {
  static sortByAcuityDesc(p: Patient[]): Patient[] {
    return p.sort((p1,p2) => p2.acuity - p1.acuity);
  }

  readonly bed: Bed;
  readonly status: Status;
  readonly acuity: T.Acuity;

  constructor({
    status,
    acuity,
    bed = new Bed(T.asRoomNumber(1), T.asBedNumber(1)),
  }: {
    status: Status,
    acuity: T.Acuity,
    bed: Bed,
  }) {
    this.status = status;
    this.acuity = acuity;
    this.bed = bed;
  }
}
