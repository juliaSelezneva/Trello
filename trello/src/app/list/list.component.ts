import { Component, Input } from '@angular/core';
import { UI } from 'junte-ui';
import { List } from './list';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent {

  ui = UI;

  @Input() title: string;

}
