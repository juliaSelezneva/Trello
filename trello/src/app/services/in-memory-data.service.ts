import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { List } from '../models/list';
import { Label } from '../models/enum';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root',
})

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const lists = [
      new List('Issue', 11),
      new List('Doing', 12),
      new List('Done',  13),
    ];
    const tickets = [
      new Ticket('Create kanban component', 1, new Date(2019, 9, 3), '2h', [Label.delay, Label.doing], 11),
      new Ticket('Refactor components', 2, new Date(2019, 10, 3), '2h', null, 11),
      new Ticket('Implement list', 3, new Date(2019, 10, 4), null, null, 12),
      new Ticket('Add ticket in list', 4, new Date(2019, 9, 5), '', [Label.doing], 12),
      new Ticket('Sort tickets', 5, new Date(2019, 10, 20), null, null, 13),
      new Ticket('Refactor list', 6, new Date(2019, 9, 25), '5h 30m', null, 13),
    ];
    return {lists, tickets};
  }

  genId(lists: List[]): number {
    return lists.length > 0 ? Math.max(...lists.map(list => list.id)) + 1 : 11;
  }
}
