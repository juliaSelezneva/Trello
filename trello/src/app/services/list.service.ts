import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { List } from '../models/list';

@Injectable({providedIn: 'root'})

export class ListService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private listsUrl = 'api/lists';

  getLists(): Observable<List[]> {
    return this.http.get<List[]>(this.listsUrl);
  }

  addList(list: {[key: string]: any}): Observable<List> {
    return this.http.post<List>(this.listsUrl, list, this.httpOptions);
  }

  constructor(private http: HttpClient) {
  }


}

