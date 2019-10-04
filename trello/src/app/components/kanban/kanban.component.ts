import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UI } from 'junte-ui';
import { ListService } from '../../services/list.service';
import { List } from '../../models/list';
import { Ticket } from '../../models/ticket';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {

  ui = UI;

  lists: List[];
  ticket: Ticket;

  constructor(private fb: FormBuilder,
              private listService: ListService) {
  }

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.listService.getLists()
      .subscribe(lists => this.lists = lists);
  }

  add() {
    this.load();
  }

  track(index, list: List) {
    return list.id;
  }

}
