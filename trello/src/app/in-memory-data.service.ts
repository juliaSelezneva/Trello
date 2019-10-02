import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { List } from './list/list';

@Injectable({
  providedIn: 'root',
})

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const lists = [
      new List('Issue', [{id: 1, content: 'Create canban component'}, {id: 2, content: 'Refactor components'}], 11),
      new List('Doing', [{id: 1, content: 'Implement list'}, {id: 2, content: 'Add ticket in list'}, {id: 3, content: 'Sort tickets'}], 12),
      new List('Done', [], 13),
    ];
    return {lists};
  }

  genId(lists: List[]): number {
    return lists.length > 0 ? Math.max(...lists.map(list => list.id)) + 1 : 11;
  }
}
