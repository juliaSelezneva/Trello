import { Mode } from '../modes-enum';

export class List {
  id?: number;
  title: string;
  tickets: Ticket[];
  mode: Mode;

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
  due_date?: Date;
  estimate?: number;

  constructor(title, id = null, estimate = null, due_date = null) {
    this.id = id;
    this.title = title;
    this.due_date = due_date;
    this.estimate = estimate;
  }
}

