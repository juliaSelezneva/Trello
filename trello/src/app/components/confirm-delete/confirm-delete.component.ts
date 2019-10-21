import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UI } from 'junte-ui';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent implements OnInit {

  ui = UI;
  @Input() message: string;
  @Output() deleted = new EventEmitter<any>();
  @Output() closed = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

}
