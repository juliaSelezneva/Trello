import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket';

@Injectable({providedIn: 'root'})

export class TicketService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private ticketsUrl = 'api/tickets';

  constructor(private http: HttpClient) {
  }

  getTicket(id: number): Observable<Ticket> {
    const url = `${this.ticketsUrl}/${id}`;
    return this.http.get<Ticket>(url);
  }

  getTickets(list: number): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.ticketsUrl).pipe(
      map(tickets => tickets.filter(ticket => ticket.list === list))
    );
  }

  addTicket(list: number, ticket: {[key: string]: any}): Observable<Ticket> {
    return this.http.post<Ticket>(this.ticketsUrl, ticket, this.httpOptions)
      .pipe(map(() => Object.assign(new Ticket(), {ticket: ticket}, {list: list})));
  }

  updateTicket(id: number, ticket: {[key: string]: any}): Observable<Ticket> {
    return this.http.put<Ticket>(this.ticketsUrl, ticket, this.httpOptions)
      .pipe(map(() => Object.assign(new Ticket(), ticket)));
  }

}
