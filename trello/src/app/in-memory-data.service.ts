import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { List, Ticket } from './list/list.models';
import { Label } from './enum';

@Injectable({
  providedIn: 'root',
})

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const lists = [
      new List('Issue', [{id: 1, title: 'Create canban component', dueDate: new Date(2019, 9, 3), estimate: '2h'},
          {id: 2, title: 'Refactor components', dueDate: new Date(2019, 9, 10), estimate: '2h', labels: [Label.delay, Label.doing]}], 11),
      new List('Doing', [{id: 3, title: 'Implement list'}, {id: 4, title: 'Add ticket in list', labels: [Label.doing]}, {id: 5, title: 'Sort tickets'}], 12),
      new List('Done', [{id: 6, title: 'Refactor list', dueDate: new Date(2019, 9, 25), estimate: '5h 30m'}], 13),
    ];
    const tickets = [
      new Ticket('Create canban component', 1, new Date(2019, 9, 3), '2h', [Label.delay, Label.doing]),
      new Ticket('Refactor components', 2, new Date(2019, 10, 3), '2h'),
      new Ticket('Implement list', 3, new Date(2019, 10, 4)),
      new Ticket('Add ticket in list', 4, new Date(2019, 9, 5), '', [Label.doing]),
      new Ticket('Sort tickets', 5, new Date(2019, 10, 20)),
      new Ticket('Refactor list', 6, new Date(2019, 9, 25), '5h 30m'),
    ];
    return {lists, tickets};
  }

  genId(lists: List[]): number {
    return lists.length > 0 ? Math.max(...lists.map(list => list.id)) + 1 : 11;
  }
}
