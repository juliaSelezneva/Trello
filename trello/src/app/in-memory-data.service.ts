import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { List } from './list/list';

@Injectable({
  providedIn: 'root',
})

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const lists = [
      new List(11, 'Issue', [{id: 1, content: 'ticket1'}, {id: 2, content: 'ticket2'}]),
      new List(12, 'Doing', [{id: 1, content: 'ticket3'}]),
      new List(13, 'Done'),
    ];
    return {lists};
  }

  genId(lists: List[]): number {
    return lists.length > 0 ? Math.max(...lists.map(list => list.id)) + 1 : 11;
  }
}
