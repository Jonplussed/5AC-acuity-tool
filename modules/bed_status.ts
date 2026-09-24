export class BedStatus {

  static Open:    BedStatus = new BedStatus("OPEN");
  static Full:    BedStatus = new BedStatus("FULL");
  static Blocked: BedStatus = new BedStatus("BLOCKED"); 

  static all = [
    this.Open,
    this.Full,
    this.Blocked,
  ];

  static fromString(label: string): BedStatus {
    let status = this.all.find((s) => s.label == label.toUpperCase());
    if (status) { return status; }
    throw new Error(`Cannot convert "${label}" into bed status.`);
  }

  readonly label: string;

  constructor(label: string) {
    this.label = label.toUpperCase();
  }

}
