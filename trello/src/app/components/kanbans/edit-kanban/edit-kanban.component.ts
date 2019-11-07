import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UI } from 'junte-ui';
import { FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { KanbanService } from '../../../services/kanban.service';
import { Kanban } from '../../../models/kanban';

@Component({
  selector: 'app-edit-kanban',
  templateUrl: './edit-kanban.component.html',
  styleUrls: ['./edit-kanban.component.scss']
})
export class EditKanbanComponent implements OnInit {

  private _kanban: Kanban;

  ui = UI;
  loading: boolean;

  editForm = this.fb.group({
    id: [],
    title: [[], Validators.required]
  });

  @Input() set kanban(kanban: Kanban) {
    this._kanban = kanban;
    this.editForm.patchValue(kanban as { [key: string]: any });
  }

  get kanban() {
    return this._kanban;
  }

  @Output()
  saved = new EventEmitter<Kanban>();

  @Output()
  closed = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
              private kanbanService: KanbanService) {
  }

  ngOnInit() {
  }

  edit(): void {
    this.loading = true;
    this.kanbanService.updateKanban(this.kanban.id, this.editForm.getRawValue())
      .pipe(finalize(() => this.loading = false))
      .subscribe(kanban => {
          this.kanban = kanban;
          this.saved.emit(kanban);
        }
      );
  }

  close() {
    this.closed.emit();
  }

}
