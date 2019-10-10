import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ListService } from '../../../services/list.service';
import { TicketService } from '../../../services/ticket.service';
import { Ticket } from '../../../models/ticket';
import { SelectMode, UI } from 'junte-ui';
import { finalize } from 'rxjs/operators';
import { Label } from '../../../models/enum';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss']
})
export class EditTicketComponent {

  ui = UI;

  private _ticket: Ticket;
  loading: boolean;

  selectMode = SelectMode;
  labels = Label;

  options: any[] = [
    { value: this.labels.delay, label: this.labels.delay },
    { value: this.labels.doing, label: this.labels.doing },
    { value: this.labels.done, label: this.labels.done },
    { value: this.labels.toDo, label: this.labels.toDo },
  ];

  @ContentChild('footer', {static: false}) footer: TemplateRef<any>;

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
    labels: []
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
    this.loading = true;
    this.ticketService.updateTicket(this.ticket.id, this.editForm.getRawValue())
      .pipe(finalize(() => this.loading = false))
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
