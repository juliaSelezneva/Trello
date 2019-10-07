import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ListService } from '../../../services/list.service';
import { TicketService } from '../../../services/ticket.service';
import { Ticket } from '../../../models/ticket';
import { UI } from 'junte-ui';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss']
})
export class EditTicketComponent {

  ui = UI;

  private _ticket: Ticket;

  @Input() set ticket(ticket: Ticket) {
    this._ticket = ticket;
    this.editForm.patchValue(ticket as { [key: string]: any });
  }

  get ticket() {
    return this._ticket;
  }

  editForm = this.fb.group({
    id: [],
    title: [[], Validators.required],
    estimate: [],
    dueDate: [],
  });


  @Output()
  saved = new EventEmitter<Ticket>();

  @Output()
  closed = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
              private listService: ListService,
              private ticketService: TicketService) {
  }

  edit(): void {
    this.ticketService.updateTicket(this.ticket.id, this.editForm.getRawValue())
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
