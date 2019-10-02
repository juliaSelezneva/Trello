import { Mode } from '../modes-enum';

export class List {
  id?: number;
  title: string;
  mode?: Mode;
  // tickets?: Ticket[];

  constructor(title, id = null, mode = Mode.view) {
    this.id = id;
    this.title = title;
    this.mode = mode;
  }
}

export class Ticket {
  id?: number;
  title: string;
  due_date?: Date;
  estimate?: number;
  list_id: number;

  constructor(title, list_id, id = null, due_date = null, estimate = null) {
    this.id = id;
    this.title = title;
    this.due_date = due_date;
    this.estimate = estimate;
    this.list_id = list_id;
  }
}

