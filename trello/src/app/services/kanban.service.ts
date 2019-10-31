import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Signals } from './in-memory-data.service';
import { Observable } from 'rxjs';
import { Kanban } from '../models/kanban';

@Injectable({providedIn: 'root'})

export class KanbanService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private kanbansUrl = 'api/kanbans';

  constructor(private http: HttpClient, private signals: Signals) {
  }

  getKanban(id: number): Observable<Kanban> {
    const url = `${this.kanbansUrl}/${id}`;
    return this.http.get<Kanban>(url);
  }

  getKanbans(): Observable<Kanban[]> {
    return this.http.get<Kanban[]>(this.kanbansUrl);
  }
}
