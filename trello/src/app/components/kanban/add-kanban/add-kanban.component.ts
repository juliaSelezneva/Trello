import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ModalOptions, ModalService, UI } from 'junte-ui';
import { FormBuilder, Validators } from '@angular/forms';
import { KanbanService } from '../../../services/kanban.service';
import { finalize } from 'rxjs/operators';
import { Kanban } from '../../../models/kanban';

@Component({
  selector: 'app-add-kanban',
  templateUrl: './add-kanban.component.html',
  styleUrls: ['./add-kanban.component.scss']
})
export class AddKanbanComponent implements OnInit {

  ui = UI;
  loading: boolean;

  @Input() kanban: Kanban;

  addForm = this.fb.group({
    id: [],
    title: [[], Validators.required],
  });

  @ViewChild('content', {static: false}) content: TemplateRef<any>;

  @Output()
  saved = new EventEmitter<Kanban>();

  @Output()
  closed = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
              private kanbanService: KanbanService,
              private modalService: ModalService) {
  }

  ngOnInit() {
  }

  openModal() {
    const options = new ModalOptions({
      title: {
        text: 'Add kanban',
        icon: UI.icons.font.plus
      },
      maxHeight: '1024px',
      maxWidth: '800px'
    });
    this.modalService.open(this.content, null, options);
  }

  add(): void {
    this.loading = true;
    this.kanbanService.addKanban(this.addForm.getRawValue())
      .pipe(finalize(() => this.loading = false))
      .subscribe(kanban => {
          this.kanban = kanban;
          this.saved.emit(kanban);
          this.addForm.reset();
          this.modalService.close();
        }
      );
  }

  close() {
    this.modalService.close();
  }

}
