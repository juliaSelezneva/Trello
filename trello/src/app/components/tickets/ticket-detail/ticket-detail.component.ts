import { Component, OnInit } from '@angular/core';
import { ListService } from '../../../services/list.service';
import { ActivatedRoute } from '@angular/router';
import { UI } from 'junte-ui';
import { TicketService } from '../../../services/ticket.service';
import { Ticket } from '../../../models/ticket';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements OnInit {

  ui = UI;
  ticket: Ticket;

  constructor(private listService: ListService,
              private ticketService: TicketService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getTicket();
  }

  getTicket(): void {
    this.route.data.subscribe(data => this.ticket = data.ticket);
  }
}
