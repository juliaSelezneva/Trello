import { Component, Input, OnInit } from '@angular/core';
import { ListService } from '../list.service';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from '../list/list.models';
import { UI } from 'junte-ui';

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
    this.listService.getTicket(id)
      .subscribe(ticket => this.ticket = ticket);
  }

  constructor(private listService: ListService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getTicket();
  }

}
