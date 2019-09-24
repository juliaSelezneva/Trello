import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { List } from './list/list';

@Injectable({
  providedIn: 'root',
})

export class InMemoryDataService implements InMemoryDbService {
  list: List;
  createDb() {
    const lists = [
      new List('Issue'),
      new List('Doing'),
      new List('Done'),
    ];
    return {lists};
  }
  //
  // genId(lists: ListComponent[]): number {
  //   return lists.length > 0 ? Math.max(...lists.map(list => list.id)) + 1 : 11;
  // }
}
