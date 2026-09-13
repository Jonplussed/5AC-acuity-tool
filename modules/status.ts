export enum Status {
  MS = "MS",
  IMC = "IMC",
}

export const fromString = function(s: string): Status {
  let status = Status[s.toUpperCase() as keyof typeof Status];

  if (status == null) {
    throw new Error(`Cannot convert "${s}" into patient status.`);
  }

  return status;
}

export const toString = function(s: Status): string {
  return s.toString();
}
