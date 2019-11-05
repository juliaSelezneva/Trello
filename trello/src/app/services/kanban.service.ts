import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Signals, SignalType } from './in-memory-data.service';
import { Observable } from 'rxjs';
import { Kanban } from '../models/kanban';
import { finalize, map } from 'rxjs/operators';
import { List } from '../models/list';

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

  addKanban(kanban: {[key: string]: any}): Observable<Kanban> {
    return this.http.post<Kanban>(this.kanbansUrl, kanban, this.httpOptions)
      .pipe(finalize(() => this.signals.dispatch(SignalType.changes)));
  }

  updateKanban(id: number, kanban: { [key: string]: any }): Observable<Kanban> {
    return this.http.put<Kanban>(this.kanbansUrl, kanban, this.httpOptions)
      .pipe(map(() => Object.assign(new Kanban(), kanban)), finalize(() => this.signals.dispatch(SignalType.changes)));
  }

  deleteKanban(id: number): Observable<Kanban> {
    const url = `${this.kanbansUrl}/${id}`;
    return this.http.delete<Kanban>(url, this.httpOptions)
      .pipe(finalize(() => this.signals.dispatch(SignalType.changes)));
  }
}
