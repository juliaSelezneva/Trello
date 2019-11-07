import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Kanban } from '../models/kanban';
import { KanbanService } from '../services/kanban.service';

@Injectable({providedIn: 'root'})
export class KanbanResolver implements Resolve<Observable<Kanban>> {

  constructor(private kanbanService: KanbanService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Kanban> {
    const id = +route.params['kanban'];
    return this.kanbanService.getKanban(id);
  }
}
