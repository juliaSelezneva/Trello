import { Label, Mode } from '../enum';

export class List {
  id?: number;
  title: string;
  tickets?: Ticket[];
  mode?: Mode;

  constructor(title: string, tickets: Ticket[] = [], id: number = null, mode: Mode = Mode.view) {
    this.id = id;
    this.title = title;
    this.tickets = tickets;
    this.mode = mode;
  }
}

export class Ticket {
  id?: number;
  title: string;
  dueDate?: Date;
  estimate?: string;
  labels?: Label[];

  constructor(title, id = null, dueDate = null, estimate = null, labels: Label[] = null) {
    this.id = id;
    this.title = title;
    this.dueDate = dueDate;
    this.estimate = estimate;
    this.labels = labels;
  }
}

