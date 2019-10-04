import { Component, Input, OnInit } from '@angular/core';
import { UI } from 'junte-ui';
import { List } from '../../models/list';
import { EditMode } from '../../models/enum';
import { FormBuilder } from '@angular/forms';
import { ListService } from '../../services/list.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  private _list: List;

  constructor(private fb: FormBuilder,
              private listService: ListService,
              private ticketService: TicketService) {
  }

  ui = UI;

  @Input()
  set list(list: List) {
    this._list = list;
    this.getTickets(this._list.id);
  }

  get list() {
    return this._list;
  }

  tickets: Ticket[] = [];
  mode = EditMode;

  ticketForm = this.fb.group({
    title: [null],
  });

  private getTickets(list): void {
    this.ticketService.getTickets(list)
      .subscribe(tickets => this.tickets = tickets);
  }

  addTicket(): void {
    const title = this.ticketForm.controls['title'].value;
    if (!title) {
      return;
    }
    title.trim();
    this.ticketService.addTicket(new Ticket(title))
      .subscribe(ticket => {
        this.tickets.push(ticket);
        this.list.mode = this.mode.view;
      });
    this.ticketForm.reset();
  }

  droppedTicket(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        this.tickets,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  compareUp(a, b) {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  }


  compareDown(a, b) {
    if (a.title > b.title) {
      return -1;
    }
    if (a.title < b.title) {
      return 1;
    }
    return 0;
  }

  ngOnInit() {
  }

}
