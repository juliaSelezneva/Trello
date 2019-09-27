import { Mode } from '../modes-enum';

export class List {
  id?: number;
  title: string;
  mode?: Mode;
  tickets?: Ticket[];

  constructor(title, tickets = [], id = null, mode = Mode.view) {
    this.id = id;
    this.title = title;
    this.tickets = tickets;
    this.mode = mode;
  }
}

export class Ticket {
  id?: number;
  content: string;
  constructor(content, id = null) {
    this.id = id;
    this.content = content;
  }
}
