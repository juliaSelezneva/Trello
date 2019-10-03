import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Ticket } from '../../list/list.models';
import { ListService } from '../../list.service';
import { ModalService, UI } from 'junte-ui';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss']
})
export class EditTicketComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private listService: ListService,
              private modalService: ModalService) {
  }

  ui = UI;

  @Input() ticket: Ticket;

  titleControl = new FormControl(null);
  estimateControl = new FormControl(null);
  dueDateControl = new FormControl(null);

  editForm = this.fb.group({
    title: this.titleControl,
    estimate: this.estimateControl,
    dueDate: this.dueDateControl,
  });

  editTicket(): void {
    const title = this.editForm.controls['title'].value;
    const estimate = this.editForm.controls['estimate'].value;
    // const dueDate = this.editForm.controls['dueDate'].value;
    if (!title) {
      return;
    }
    title.trim();
    if (!!estimate) {
      estimate.trim();
    }
    this.ticket.title = title;
    this.ticket.estimate = estimate;
    this.listService.updateTicket(this.ticket)
      .subscribe(ticket => this.ticket = ticket);
  }

  close() {
    this.editForm.reset();
    this.modalService.close();
  }

  ngOnInit() {
    this.titleControl.setValue(this.ticket.title);
    this.estimateControl.setValue(this.ticket.estimate);
  }

}
