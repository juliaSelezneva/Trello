import { Label, EditMode } from './enum';

export class List {
  id?: number;
  title: string;
  // tickets?: Ticket[];
  mode?: EditMode;

  constructor(title: string, id: number = null, mode: EditMode = EditMode.view) {
    this.id = id;
    this.title = title;
    // this.tickets = tickets;
    this.mode = mode;
  }
}

