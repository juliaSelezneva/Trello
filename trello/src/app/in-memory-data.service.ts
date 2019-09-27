import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { List } from './list/list';

@Injectable({
  providedIn: 'root',
})

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const lists = [
      new List('Issue', [{id: 1, content: 'ticket1'}, {id: 2, content: 'ticket2'}], 11),
      new List('Doing', [{id: 1, content: 'ticket3'}, {id: 2, content: 'ticket4'}, {id: 3, content: 'ticket5'}], 12),
      new List('Done', [], 13),
    ];
    return {lists};
  }

  genId(lists: List[]): number {
    return lists.length > 0 ? Math.max(...lists.map(list => list.id)) + 1 : 11;
  }
}
