import { Component, Input, OnInit } from '@angular/core';
import { UI } from 'junte-ui';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {

  ui = UI;

  @Input() title: string;

  active: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
