export class Status {
  static fromString(s: string): Status {
    switch (s.toUpperCase()) {
      case this.MS.label:  return this.MS;
      case this.IMC.label: return this.IMC;
    }

    throw new Error(`Cannot convert "${s}" into patient status.`);
  }

  static highest(s1: Status, s2: Status): Status {
    if (s1.value >= s2.value) {
      return s1;
    } else {
      return s2;
    }
  }

  static MS:  Status = new Status(0, "MS");
  static IMC: Status = new Status(1, "IMC");

  readonly value: number;
  readonly label: string;

  constructor(value: number, label: string) {
    this.value = value;
    this.label = label.toUpperCase();
  }
}
