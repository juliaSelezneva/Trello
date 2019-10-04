import { Label } from './enum';

export class Ticket {

  constructor(public title: string,
              public id: number = null,
              public dueDate: Date = null,
              public estimate: string = null,
              public labels: Label[] = null,
              public list: number = null) {

  }
}
