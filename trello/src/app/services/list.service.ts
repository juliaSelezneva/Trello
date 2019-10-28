import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { List } from '../models/list';
import { finalize, map, max } from 'rxjs/operators';
import { Signals, SignalType } from './in-memory-data.service';

@Injectable({providedIn: 'root'})

export class ListService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private listsUrl = 'api/lists';

  constructor(private http: HttpClient, private signals: Signals) {
  }

  getLists(): Observable<List[]> {
    return this.http.get<List[]>(this.listsUrl);
  }

  addList(list: { [key: string]: any }): Observable<List> {

    return new Observable<List>(o => {
      this.http.get<List[]>(this.listsUrl).pipe(max<any>((a: List, b: List) => a.order < b.order ? -1 : 1),
      )
        .subscribe(lists => {
        // const maxOrder = 100;
        //
        // list['order'] = maxOrder;

        this.http.post<List>(this.listsUrl, list, this.httpOptions)
          .pipe(finalize(() => this.signals.dispatch(SignalType.changes)))
          .subscribe(() => {
            o.next(),
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

