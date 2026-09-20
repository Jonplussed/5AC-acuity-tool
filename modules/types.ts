declare const NewtypeTag: unique symbol;

type Newtype<T, Tag> = T & {
  readonly [NewtypeTag]: Tag;
};

// *If this works* then it should provide zero-overhead write-protection for
// objects with internal properties. Testing this requires type-checking unit
// tests, which feels insane.

export type Writable<T> = {
  -readonly [Attr in keyof T]: T[Attr];
};

// Newtypes over the many numbers and strings to prevent cross-contamination.

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

