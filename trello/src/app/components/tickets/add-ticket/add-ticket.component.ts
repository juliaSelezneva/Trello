import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { List } from '../../../models/list';
import { EditMode } from '../../../models/enum';
import { UI } from 'junte-ui';
import { Ticket } from '../../../models/ticket';

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
    title: [null, [Validators.required]]
  });

  @Input() list: List;

  @Output()
  added = new EventEmitter<Ticket>();

  constructor(private fb: FormBuilder) {
  }

  add(): void {
    const ticket = Object.assign({list: this.list.id}, this.ticketForm.getRawValue());
    this.added.emit(ticket);
    this.ticketForm.reset();
    this.mode = EditMode.view;
  }
}
