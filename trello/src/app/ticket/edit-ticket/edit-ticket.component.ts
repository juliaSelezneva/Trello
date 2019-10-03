import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Ticket } from '../../list/list.models';
import { ListService } from '../../list.service';
import { ModalService, UI } from 'junte-ui';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss']
})
export class EditTicketComponent {

  ui = UI;

  private _ticket: Ticket;

  @Input() set ticket (ticket: Ticket) {
    this._ticket = ticket;
    this.editForm.patchValue(ticket as {[key: string]: any});
  }

  get ticket() {
    return this._ticket;
  }

  editForm = this.fb.group({
    title: [[] , Validators.required],
    estimate: [],
    dueDate: [],
  });

  saved = new EventEmitter<Ticket>();

  constructor(private fb: FormBuilder,
              private listService: ListService) {
  }

  editTicket(): void {
    this.listService.updateTicket(this.ticket.id, this.editForm.getRawValue())
      .subscribe(ticket => {
         this.ticket = ticket;
         this.saved.emit(ticket);
        }
      );
  }

}
