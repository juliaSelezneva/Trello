import { Mode } from '../modes-enum';

export class List {
  id: number;
  title: string;
  mode: Mode;
  tickets: Ticket[];

  constructor(id, title, tickets?) {
    this.id = id;
    this.title = title;
    this.tickets = tickets;
    this.mode = Mode.view;
  }
}

export class Ticket {
  id: number;
  content: string;
}
