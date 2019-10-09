import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UI } from 'junte-ui';
import { ListService } from '../../services/list.service';
import { List } from '../../models/list';
import { Ticket } from '../../models/ticket';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {

  ui = UI;

  lists: List[] = [];
  ticket: Ticket;
  loading: boolean;

  constructor(private fb: FormBuilder,
              private listService: ListService) {
  }

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.listService.getLists().pipe(finalize(() => this.loading = false))
      .subscribe(lists => this.lists = lists);
  }

  track(index, list: List) {
    return list.id;
  }

}
