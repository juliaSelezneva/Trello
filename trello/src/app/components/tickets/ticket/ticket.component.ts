import { Component, ComponentFactoryResolver, Injector, Input, OnInit } from '@angular/core';
import { ModalOptions, ModalService, UI } from 'junte-ui';
import { Label } from '../../../models/enum';
import { EditTicketComponent } from '../edit-ticket/edit-ticket.component';
import { Ticket } from '../../../models/ticket';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  constructor(private modalService: ModalService,
              private injector: Injector,
              private cfr: ComponentFactoryResolver) {
  }

  ui = UI;

  @Input() title: string;
  @Input() dueDate: Date;
  @Input() estimate: string;
  @Input() labels: Label[];
  @Input() ticket: Ticket;

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
      maxWidth: '400px'
    });
    this.modalService.open(component, null, options);
  }

  ngOnInit() {
  }

}
