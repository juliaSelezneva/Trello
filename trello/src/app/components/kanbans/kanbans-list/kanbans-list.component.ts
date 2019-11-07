import { Component, ComponentFactoryResolver, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { ModalOptions, ModalService, UI } from 'junte-ui';
import { Kanban } from '../../../models/kanban';
import { finalize } from 'rxjs/operators';
import { KanbanService } from '../../../services/kanban.service';
import { ConfirmDeleteComponent } from '../../confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-board',
  templateUrl: './kanbans-list.component.html',
  styleUrls: ['./kanbans-list.component.scss']
})
export class KanbansListComponent implements OnInit {

  ui = UI;

  kanbans: Kanban[] = [];
  loading: boolean;

  constructor(private kanbanService: KanbanService) {
  }

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.kanbanService.getKanbans()
      .pipe(finalize(() => this.loading = false))
      .subscribe(kanbans => {
        this.kanbans = kanbans;
      });
  }
}
