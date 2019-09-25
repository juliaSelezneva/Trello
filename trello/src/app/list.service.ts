import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { List } from './list/list';
import { ListComponent } from './list/list.component';

@Injectable({
  providedIn: 'root',
})

export class ListService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private listsUrl = 'api/lists';

  getLists(): Observable<List[]> {
    return this.http.get<List[]>(this.listsUrl);
  }

  addList(list: List): Observable<List> {
    return this.http.post<List>(this.listsUrl, list, this.httpOptions);
  }

  constructor(private http: HttpClient) {
  }


}
