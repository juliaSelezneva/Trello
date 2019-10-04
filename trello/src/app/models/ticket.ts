import { Label } from './enum';

export class Ticket {
  id?: number;
  title: string;
  dueDate?: Date;
  estimate?: string;
  labels?: Label[];
  list?: number;

  constructor(title, id = null, dueDate = null, estimate = null, labels: Label[] = null, list = null) {
    this.id = id;
    this.title = title;
    this.dueDate = dueDate;
    this.estimate = estimate;
    this.labels = labels;
    this.list = list;
  }
}
