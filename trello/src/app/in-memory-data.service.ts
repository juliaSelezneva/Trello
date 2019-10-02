import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { List, Ticket } from './list/list';

@Injectable({
  providedIn: 'root',
})

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const lists = [
      new List('Issue', [{id: 1, title: 'Create canban component'}, {id: 2, title: 'Refactor components'}], 11),
      new List('Doing', [{id: 3, title: 'Implement list'}, {id: 4, title: 'Add ticket in list'}, {id: 5, title: 'Sort tickets'}], 12),
      new List('Done', [], 13),
    ];
    const tickets = [
      new Ticket('Create canban component', 1),
      new Ticket('Refactor components', 2),
      new Ticket('Implement list', 3),
      new Ticket('Add ticket in list', 4),
      new Ticket('Sort tickets', 5),
    ];
    return {lists, tickets};
  }

  genId(lists: List[]): number {
    return lists.length > 0 ? Math.max(...lists.map(list => list.id)) + 1 : 11;
  }
}
