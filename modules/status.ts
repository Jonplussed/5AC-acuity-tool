const STATUS_MS_STR = "MS";
const STATUS_IMC_STR = "IMC";

export enum Status {
  MS,
  IMC,
}

export const highest = (s1: Status, s2: Status): Status => {
  if (s1 >= s2) {
    return s1;
  } else {
    return s2;
  };
}

export const fromString = (s: string): Status => {
  switch (s.toUpperCase()) {
    case STATUS_MS_STR: return Status.MS;
    case STATUS_IMC_STR: return Status.IMC;
  }

  throw new Error(`Cannot convert "${s}" into patient status.`);
}

export const toString = (s: Status): string => {
  switch (s) {
    case Status.MS: return STATUS_MS_STR;
    case Status.IMC: return STATUS_IMC_STR;
  }
}
