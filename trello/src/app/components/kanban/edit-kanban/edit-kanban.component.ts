import { Component, OnInit } from '@angular/core';
import { UI } from 'junte-ui';
import { FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { KanbanService } from '../../../services/kanban.service';

@Component({
  selector: 'app-edit-kanban',
  templateUrl: './edit-kanban.component.html',
  styleUrls: ['./edit-kanban.component.scss']
})
export class EditKanbanComponent implements OnInit {

  ui = UI;
  loading: boolean;

  editForm = this.fb.group({
    id: [],
    title: [[], Validators.required]
  });

  constructor(private fb: FormBuilder,
              kanbanService: KanbanService) { }

  ngOnInit() {
  }

  edit(): void {
    this.loading = true;
    this.kanbanService.updateKanban(this.ticket.id, this.editForm.getRawValue())
      .pipe(finalize(() => this.loading = false))
      .subscribe(ticket => {
          this.ticket = ticket;
          this.saved.emit(ticket);
        }
      );
  }

  close() {
    this.closed.emit();
  }

}
