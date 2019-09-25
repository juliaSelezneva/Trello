import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const lists = [
      { title: 'Issue' },
      { title: 'Doing' },
      { title: 'Done'}
    ];
    return {lists};
  }
  //
  // genId(lists: ListComponent[]): number {
  //   return lists.length > 0 ? Math.max(...lists.map(list => list.id)) + 1 : 11;
  // }
}
