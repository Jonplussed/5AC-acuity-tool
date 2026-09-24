export class PatientStatus {

  static MS:  PatientStatus = new PatientStatus(1, "MS");
  static IMC: PatientStatus = new PatientStatus(2, "IMC");

  static all = [
    this.MS,
    this.IMC,
  ];

  static fromString(label: string): PatientStatus {
    let status = this.all.find((s) => s.label == label.toUpperCase());
    if (status) { return status; }
    throw new Error(`Cannot convert "${label}" into patient status.`);
  }

  static highest(s1: PatientStatus, s2: PatientStatus): PatientStatus {
    if (s1.priority >= s2.priority) {
      return s1;
    } else {
      return s2;
    }
  }

  readonly priority: number;
  readonly label: string;

  constructor(g: number, label: string) {
    this.priority = priority;
    this.label = label.toUpperCase();
  }

}
