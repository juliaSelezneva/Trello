import { Component, ComponentFactoryResolver, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { ModalOptions, ModalService, UI } from 'junte-ui';
import { Kanban } from '../../../models/kanban';
import { ConfirmDeleteComponent } from '../../shared/confirm-delete/confirm-delete.component';
import { KanbanService } from '../../../services/kanban.service';
import { finalize } from 'rxjs/operators';
import { EditKanbanComponent } from '../edit-kanban/edit-kanban.component';

@Component({
  selector: 'app-preview-kanban',
  templateUrl: './preview-kanban.component.html',
  styleUrls: ['./preview-kanban.component.scss']
})
export class PreviewKanbanComponent implements OnInit {

  ui = UI;

  loading: boolean;
  @Input() kanban: Kanban;

  @Output() deleted = new EventEmitter<any>();
  @Output() saved = new EventEmitter<Kanban>();

  constructor(private modalService: ModalService,
              private injector: Injector,
              private cfr: ComponentFactoryResolver,
              private kanbanService: KanbanService) {
  }

  ngOnInit() {
  }

  openModal() {
    const component = this.cfr.resolveComponentFactory(EditKanbanComponent).create(this.injector);
    component.instance.kanban = this.kanban;
    component.instance.saved.subscribe((kanban) => {
      this.kanban = kanban;
      this.modalService.close();
    });
    component.instance.closed.subscribe(() => {
      this.modalService.close();
    });
    const options = new ModalOptions({
      title: {
        text: 'Edit kanban',
        icon: UI.icons.font.edit
      },
      maxHeight: '1024px',
      maxWidth: '800px'
    });
    this.modalService.open(component, null, options);
  }

  confirm() {
    const component = this.cfr.resolveComponentFactory(ConfirmDeleteComponent).create(this.injector);
    component.instance.message = 'Are you sure you want to delete this kanban?';
    component.instance.deleted.subscribe(() => {
      this.delete();
      this.modalService.close();
    });
    component.instance.closed.subscribe(() => this.modalService.close());
    const options = new ModalOptions({
      title: {
        text: 'Delete',
        icon: UI.icons.font.delete
      }
    });
    this.modalService.open(component, null, options);
  }

  delete(): void {
    this.loading = true;
    this.kanbanService.deleteKanban(this.kanban.id)
    .pipe(finalize(() => this.loading = false))
      .subscribe(() => this.deleted.emit());
  }

}
