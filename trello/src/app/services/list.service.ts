import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { List } from '../models/list';
import { finalize, map } from 'rxjs/operators';
import { Signals, SignalType } from './in-memory-data.service';

@Injectable({providedIn: 'root'})

export class ListService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private listsUrl = 'api/lists';

  constructor(private http: HttpClient, private signals: Signals) {
  }

  getLists(kanban: number): Observable<List[]> {
    return this.http.get<List[]>(this.listsUrl).pipe(
      map(lists => lists.filter(list => list.kanban === kanban))
    );
  }

  addList(kanban: number, list: { [key: string]: any }): Observable<List> {
    return new Observable<List>(o => {
      this.http.get<List[]>(this.listsUrl)
        .subscribe(lists => {
          const max = lists.length > 0 ? lists.reduce((prev, current) =>
            (current.order > prev ? current.order : prev), lists[0].order) : 0;
          this.http.post<List>(this.listsUrl, {...list, kanban: kanban, order: max + 1}, this.httpOptions)
            .pipe(finalize(() => this.signals.dispatch(SignalType.changes)))
            .subscribe(added => {
              o.next(added);
              o.complete();
            });
        });
    });
  }

  updateList(id: number, list: { [key: string]: any }): Observable<List> {
    return this.http.put<List>(this.listsUrl, list, this.httpOptions)
      .pipe(map(() => Object.assign(new List(), list)), finalize(() => this.signals.dispatch(SignalType.changes)));
  }

  deleteList(id: number): Observable<List> {
    const url = `${this.listsUrl}/${id}`;
    return this.http.delete<List>(url, this.httpOptions)
      .pipe(finalize(() => this.signals.dispatch(SignalType.changes)));
  }
}

