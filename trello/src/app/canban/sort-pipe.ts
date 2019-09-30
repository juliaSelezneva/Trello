import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'sortUp'})
export class SortUpPipe implements PipeTransform {
  transform(a, b): number {
    if (a.content < b.content) {
      return -1;
    }
    if (a.content > b.content) {
      return 1;
    }
    return 0;
  }
}
