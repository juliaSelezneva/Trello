import { Component, ComponentFactoryResolver, ContentChild, Injector, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalOptions, ModalService, UI } from 'junte-ui';
import { Ticket } from '../list/list.models';
import { Label } from '../enum';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  constructor(private modalService: ModalService,
              private injector: Injector,
              private cfr: ComponentFactoryResolver) {}

  ui = UI;

  @Input() title: string;
  @Input() dueDate: Date;
  @Input() estimate: string;
  @Input() labels: Label[];
  @Input() ticket: Ticket;

  @ContentChild('actionsTicket', {static: false})
  actionsTicket: TemplateRef<any>;

  @ViewChild('footerModal', {static: false})
  footerModal: TemplateRef<any>;

  openModal() {
    const component = this.cfr.resolveComponentFactory(EditTicketComponent).create(this.injector);
    component.instance.title = this.ticket.title;
    const options = new ModalOptions({
      title: {
        text: 'Edit ticket',
        icon: UI.icons.font.edit
      },
      maxHeight: '1024px',
      maxWidth: '400px'
    });
    this.modalService.open(component, this.footerModal, options);
  }

  ngOnInit() {
  }

}
