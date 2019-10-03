import { Component, ContentChild, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Colors, LabelComponent, UI } from 'junte-ui';
import { List, Ticket } from '../list/list.models';
import { ListService } from '../list.service';
import { ActivatedRoute } from '@angular/router';
import { Label } from '../enum';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  ui = UI;

  @Input() title: string;
  @Input() dueDate: Date;
  @Input() estimate: string;
  @Input() labels: Label[];
  @Input() ticket: Ticket;

  @ContentChild('actionsTicket', {static: false})
  actionsTicket: TemplateRef<any>;

  ngOnInit() {
  }

}
