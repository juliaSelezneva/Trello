import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { UI } from 'junte-ui';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  ui = UI;

  @Input() content: string;

  @ContentChild('actionsTicket', {static: false})
  actionsTicket: TemplateRef<any>;

  constructor() {
  }

  ngOnInit() {
  }

}
