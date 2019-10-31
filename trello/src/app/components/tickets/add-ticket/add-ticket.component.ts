import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { List } from '../../../models/list';
import { EditMode, Label } from '../../../models/enum';
import { UI } from 'junte-ui';
import { Ticket } from '../../../models/ticket';
import { TicketService } from '../../../services/ticket.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent {

  editMode = EditMode;
  mode = EditMode.view;
  loading: boolean;

  ui = UI;

  ticketForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    order: []
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
    this.loading = true;
    this.ticketService.addTicket(this.list.id, this.ticketForm.getRawValue())
      .pipe(finalize(() => this.loading = false))
      .subscribe(ticket => {
        this.ticket = ticket;
        this.added.emit(ticket);
        this.ticketForm.reset();
        this.mode = EditMode.view;
      });
  }
}
