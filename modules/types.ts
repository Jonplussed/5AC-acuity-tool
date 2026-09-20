declare const NewtypeTag: unique symbol;

type Newtype<T, Tag> = T & {
  readonly [NewtypeTag]: Tag;
};

export type Acuity = Newtype<number, "Acuity">;
export const asAcuity = (x: number) => x as Acuity;

export type AssignmentCount = Newtype<number, "AssignmentCount">;
export const asAssignmentCount = (x: number) => x as AssignmentCount;

export type BedNumber = Newtype<number, "BedNumber">;
export const asBedNumber = (x: number) => x as BedNumber;

export type PatientCount = Newtype<number, "PatientCount">;
export const asPatientCount = (x: number) => x as PatientCount;

export type RoomNumber = Newtype<number, "RoomNumber">;
export const asRoomNumber = (x: number) => x as RoomNumber;

