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

  getTicket(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.ticketService.getTicket(id)
      .subscribe(ticket => this.ticket = ticket);
  }

  constructor(private listService: ListService,
              private ticketService: TicketService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getTicket();
  }

}
