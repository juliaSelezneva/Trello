import { Component, OnInit } from '@angular/core';
import { UI } from 'junte-ui';
import { Kanban } from '../../models/kanban';
import { finalize } from 'rxjs/operators';
import { KanbanService } from '../../services/kanban.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

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
