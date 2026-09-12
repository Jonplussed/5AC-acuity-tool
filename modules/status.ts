export enum Status {
  MS = "MS",
  IMC = "IMC",
}

export const fromString = function(s: string): Status {
  switch (s.toUpperCase()) {
    case "MS":
      return Status.MS;
    case "IMC":
      return Status.IMC;
    default:
      throw new Error(`Cannot convert "${s}" into patient status.`);
  }
}
