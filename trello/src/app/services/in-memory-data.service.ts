import { InMemoryDbService } from 'angular-in-memory-web-api';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { List } from '../models/list';
import { Label } from '../models/enum';
import { Ticket } from '../models/ticket';
import { Kanban } from '../models/kanban';

const DB_KEY = 'db';

export enum SignalType {
  changes = 1
}

@Injectable({
  providedIn: 'root',
})
export class Signals {
  @Output()
  signal = new EventEmitter<SignalType>();

  dispatch(signal: SignalType) {
    this.signal.emit(signal);
  }
}

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {

  constructor(private signals: Signals) {
  }

  createDb() {

    const kanbans = [
      new Kanban('First canban', 1),
      new Kanban('Second canban', 2),
    ];
    const lists = [
      new List('Issue', 0, 1, 11),
      new List('Doing', 1, 1, 12),
      new List('Done', 2, 1, 13),
      new List('Delay', 3, 1, 14),
      new List('Test', 0, 2, 15),
    ];
    const tickets = [
      new Ticket('Create kanban component', 0, 1, new Date(2019, 9, 3), '2h', [Label.delay, Label.doing], 11),
      new Ticket('Refactor components', 1, 2, new Date(2019, 10, 3), '2h', null, 11),
      new Ticket('Implement list', 2, 3, new Date(2019, 10, 4), null, null, 12),
      new Ticket('Add ticket in list', 3, 4, new Date(2019, 9, 5), '', [Label.doing], 12),
      new Ticket('Sort tickets', 4, 5, new Date(2019, 10, 20), null, null, 13),
      new Ticket('Refactor list', 5, 6, new Date(2019, 9, 25), '5h 30m', null, 13),
    ];

    const initial = {kanbans, lists, tickets};

    const db = JSON.parse(localStorage.getItem(DB_KEY)) || initial;

    this.signals.signal.subscribe(type => {
      if (type === SignalType.changes) {
        localStorage.setItem(DB_KEY, JSON.stringify(db));
      }
    });

    return db;
  }

  genId(lists: List[]): number {
    return lists.length > 0 ? Math.max(...lists.map(list => list.id)) + 1 : 11;
  }
}
