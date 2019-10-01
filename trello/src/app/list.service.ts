import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { List, Ticket } from './list/list';

@Injectable({
  providedIn: 'root',
})

export class ListService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private listsUrl = 'api/lists';
  private ticketsUrl = 'api/tickets';
  getLists(): Observable<List[]> {
    return this.http.get<List[]>(this.listsUrl);
  }

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.ticketsUrl);
  }

  getList(id: number): Observable<List> {
    const url = `${this.listsUrl}/${id}`;
    return this.http.get<List>(url);
  }

  getTicket(id: number): Observable<Ticket> {
    const url = `${this.ticketsUrl}/${id}`;
    return this.http.get<Ticket>(url);
  }

  addList(list: List): Observable<List> {
    return this.http.post<List>(this.listsUrl, list, this.httpOptions);
  }

  addTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.listsUrl, ticket, this.httpOptions);
  }

  updateTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(this.listsUrl, ticket, this.httpOptions);
  }

  constructor(private http: HttpClient) {
  }


}
