import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { UI } from 'junte-ui';
import { List, Ticket } from '../list/list';
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
  @Input() source: string;

  @ContentChild('actionsTicket', {static: false})
  actionsTicket: TemplateRef<any>;

  ngOnInit() {
  }

}
