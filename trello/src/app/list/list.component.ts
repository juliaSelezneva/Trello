import { Component, Input } from '@angular/core';
import { List } from './list';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [
    List
  ]
})

export class ListComponent {

  @Input() title = this.list.title;

  constructor(private list: List) {}

}
