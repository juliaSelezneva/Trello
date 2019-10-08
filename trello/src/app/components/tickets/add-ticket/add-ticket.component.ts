import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { List } from '../../../models/list';
import { EditMode } from '../../../models/enum';
import { UI } from 'junte-ui';
import { Ticket } from '../../../models/ticket';
import { ListService } from '../../../services/list.service';
import { TicketService } from '../../../services/ticket.service';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent {

  editMode = EditMode;
  mode = EditMode.view;
  ui = UI;

  ticketForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]]
  });

  @Input() list: List;
  @Input() ticket: Ticket;
  @Input() tickets: Ticket[];

  @Output()
  added = new EventEmitter<Ticket>();

  constructor(private fb: FormBuilder,
              private ticketService: TicketService) {
  }

  add(): void {
    this.ticketService.addTicket(this.list.id, this.ticketForm.getRawValue())
      .subscribe(ticket => {
        this.ticket = ticket;
        this.added.emit(ticket);
        this.ticketForm.reset();
        this.mode = EditMode.view;
      });
  }
}
