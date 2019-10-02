import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { UI } from 'junte-ui';
import { List, Ticket } from '../list/list.models';
import { ListService } from '../list.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  ui = UI;

  @Input() title: string;
  @Input() ticket: Ticket;

  @ContentChild('actionsTicket', {static: false})
  actionsTicket: TemplateRef<any>;

  ngOnInit() {
  }

}
