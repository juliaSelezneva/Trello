import { Injectable } from '@angular/core';
import { List } from './list/list';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ListComponent } from './list/list.component';

@Injectable({
  providedIn: 'root',
})

export class ListService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private listsUrl = 'api/lists';

  getLists(): Observable<ListComponent[]> {
    return this.http.get<ListComponent[]>(this.listsUrl);
  }

  addList(list: List): Observable<ListComponent> {
    return this.http.post<ListComponent>(this.listsUrl, list, this.httpOptions);
  }

  constructor(private http: HttpClient) {
  }


}
