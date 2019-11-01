import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UI } from 'junte-ui';
import { ListService } from '../../services/list.service';
import { List } from '../../models/list';
import { Ticket } from '../../models/ticket';
import { finalize } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { compareUp } from '../../utils/sort';
import { Kanban } from '../../models/kanban';
import { KanbanService } from '../../services/kanban.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {

  ui = UI;

  kanban: Kanban;
  lists: List[] = [];
  ticket: Ticket;
  loading: boolean;
  connections: string[];

  constructor(private fb: FormBuilder,
              private listService: ListService,
              private kanbanService: KanbanService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.loading = true;
    const id = +this.route.snapshot.paramMap.get('id');
    this.kanbanService.getKanban(id)
      .subscribe(kanban => {
        this.kanban = kanban;
        this.listService.getLists(this.kanban.id)
          .pipe(finalize(() => this.loading = false))
          .subscribe(lists => {
            this.lists = lists.sort((a, b) => compareUp(a, b, 'order'));
            this.connections = lists.map(list => `list_${list.id}`);
          });
      });
  }

  track(index, list: List) {
    return list.id;
  }

  dropped(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.lists,
      event.previousIndex,
      event.currentIndex
    );
    this.loading = true;
    this.lists.forEach((list, index) => {
      list.order = index;
      this.listService.updateList(list.id, list as { [p: string]: any })
        .pipe(finalize(() => this.loading = false))
        .subscribe();
    });
  }


}

