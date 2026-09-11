export enum Status {
  MS = "MS",
  IMC = "IMC",
}

export const fromString = function(s: string): Status {
  if (s in Status) {
    return Status[s.toUpperCase() as keyof typeof Status];
  }

  throw new Error(`Cannot convert "${s}" into patient status.`);
}
