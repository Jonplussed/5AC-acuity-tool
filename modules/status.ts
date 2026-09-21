export class Status {
  static MS:  Status = new Status(1, "MS");
  static IMC: Status = new Status(2, "IMC");

  static all = [this.MS, this.IMC];

  static fromString(label: string): Status {
    let status = this.all.find((s) => s.label == label.toUpperCase());
    if (status) { return status; }
    throw new Error(`Cannot convert "${label}" into patient status.`);
  }

  static highest(s1: Status, s2: Status): Status {
    if (s1.value >= s2.value) {
      return s1;
    } else {
      return s2;
    }
  }

  readonly value: number;
  readonly label: string;

  constructor(value: number, label: string) {
    this.value = value;
    this.label = label.toUpperCase();
  }
}
