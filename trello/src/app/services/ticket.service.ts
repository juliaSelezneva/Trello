import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket';
import { Signals, SignalType } from './in-memory-data.service';

@Injectable({providedIn: 'root'})

export class TicketService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private ticketsUrl = 'api/tickets';

  constructor(private http: HttpClient, private signals: Signals) {
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

  addTicket(list: number, ticket: { [key: string]: any }): Observable<Ticket> {
    return new Observable<Ticket>(o => {
      this.http.get<Ticket[]>(this.ticketsUrl)
        .subscribe(tickets => {
          const max = tickets.length > 0 ? tickets.reduce((prev, current) =>
            (current.order > prev ? current.order : prev), tickets[0].order) : 0;
          this.http.post<Ticket>(this.ticketsUrl, {...ticket, list: list, order: max + 1}, this.httpOptions)
            .pipe(finalize(() => this.signals.dispatch(SignalType.changes)))
            .subscribe(added => {
              o.next(added);
              o.complete();
            });
        });
    });
  }

  updateTicket(id: number, ticket: { [key: string]: any }): Observable<Ticket> {
    return this.http.put<Ticket>(this.ticketsUrl, ticket, this.httpOptions)
      .pipe(map(() => Object.assign(new Ticket(), ticket)), finalize(() => this.signals.dispatch(SignalType.changes)));
  }

  deleteTicket(id: number): Observable<Ticket> {
    const url = `${this.ticketsUrl}/${id}`;
    return this.http.delete<Ticket>(url, this.httpOptions)
      .pipe(finalize(() => this.signals.dispatch(SignalType.changes)));
  }

}
