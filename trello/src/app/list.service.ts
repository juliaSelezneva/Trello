import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { List, Ticket } from './list/list.models';
import { filter } from 'rxjs/operators';

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

  updateTicket(id: number, ticket: {[key: string]: any}): Observable<any> {
    return this.http.put<Ticket>(`${this.listsUrl}/${id}`, ticket, this.httpOptions);
  }

  constructor(private http: HttpClient) {
  }


}

// export class TicketsService {
//
//   list(list: number): Observable<Ticket[]> {
//     return this.http.get<Ticket>(this.ticketsUrl)
//       .pipe(filter((ticket) => ticket.list === list));
//   }
//
// }
