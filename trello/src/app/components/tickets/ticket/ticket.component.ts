import { Component, ComponentFactoryResolver, EventEmitter, Injector, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ModalOptions, ModalService, UI } from 'junte-ui';
import { Label } from '../../../models/enum';
import { EditTicketComponent } from '../edit-ticket/edit-ticket.component';
import { Ticket } from '../../../models/ticket';
import { finalize } from 'rxjs/operators';
import { ListService } from '../../../services/list.service';
import { TicketService } from '../../../services/ticket.service';
import { ConfirmDeleteComponent } from '../../confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  constructor(private modalService: ModalService,
              private injector: Injector,
              private cfr: ComponentFactoryResolver,
              private ticketService: TicketService) {
  }

  ui = UI;
  loading: boolean;
  @Output() deleted = new EventEmitter<any>();

  @Input() title: string;
  @Input() dueDate: Date;
  @Input() estimate: string;
  @Input() labels: Label[];
  @Input() ticket: Ticket;

  delete(): void {
    this.loading = true;
    this.ticketService.deleteTicket(this.ticket.id)
      .pipe(finalize(() => this.loading = false))
      .subscribe(() => this.deleted.emit());
  }

  openModal() {
    const component = this.cfr.resolveComponentFactory(EditTicketComponent).create(this.injector);
    component.instance.ticket = this.ticket;
    component.instance.saved.subscribe(ticket => {
      this.modalService.close();
      this.ticket = ticket;
    });
    component.instance.closed.subscribe(() => {
      this.modalService.close();
    });
    const options = new ModalOptions({
      title: {
        text: 'Edit ticket',
        icon: UI.icons.font.edit
      },
      maxHeight: '1024px',
      maxWidth: '800px'
    });
    this.modalService.open(component, null, options);
  }

  confirm() {
    const component = this.cfr.resolveComponentFactory(ConfirmDeleteComponent).create(this.injector);
    component.instance.message = 'Are you sure you want to delete this ticket?';
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

  ngOnInit() {
  }

}
