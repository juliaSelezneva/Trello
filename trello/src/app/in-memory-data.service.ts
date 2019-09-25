import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { List } from './list/list';

@Injectable({
  providedIn: 'root',
})

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const lists = [
      { id: 11, title: 'Issue', tickets: [{id: 1, content: 'ticket1'}, {id: 2, content: 'ticket2'}] },
      { id: 12, title: 'Doing', tickets: [{id: 1, content: 'ticket3'}] },
      { id: 13, title: 'Done' }
    ];
    return {lists};
  }

  genId(lists: List[]): number {
    return lists.length > 0 ? Math.max(...lists.map(list => list.id)) + 1 : 11;
  }
}
