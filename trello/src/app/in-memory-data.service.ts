import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { List, Ticket } from './list/list';

@Injectable({
  providedIn: 'root',
})

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const lists = [
      new List('Issue', 11),
      new List('Doing', 12),
      new List('Done', 13),
    ];
    const tickets = [
      new Ticket('Create canban component', 11, 1),
      new Ticket('Refactor components', 11, 2),
      new Ticket('Implement list', 12, 3),
      new Ticket('Add ticket in list', 12, 4),
      new Ticket('Sort tickets', 12, 5)
    ];
    return {lists, tickets};
  }

  genId(lists: List[]): number {
    return lists.length > 0 ? Math.max(...lists.map(list => list.id)) + 1 : 11;
  }
}
