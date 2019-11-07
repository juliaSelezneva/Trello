import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket';
import { TicketService } from '../services/ticket.service';

@Injectable({providedIn: 'root'})
export class TicketResolver implements Resolve<Observable<Ticket>> {

  constructor(private ticketService: TicketService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Ticket> {
    const id = +route.params['ticket'];
    return this.ticketService.getTicket(id);
  }
}
