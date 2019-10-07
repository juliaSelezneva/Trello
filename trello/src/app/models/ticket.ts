import { Label } from './enum';

export class Ticket {

  // constructor(defs: {[key: string]: any}) {
  //   Object.assign(this, defs);
  // }

  constructor(public title: string = null,
              public id: number = null,
              public dueDate: Date = null,
              public estimate: string = null,
              public labels: Label[] = null,
              public list: number = null) {

  }
}
