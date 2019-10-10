import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { UI } from 'junte-ui';
import { List } from '../../models/list';
import { FormBuilder, FormControl } from '@angular/forms';
import { ListService } from '../../services/list.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  private _list: List;
  title: string;
  ui = UI;
  titleControl = new FormControl();

  listForm = this.fb.group({
    title: this.titleControl
  });

  @ViewChild('control', {static: true}) control: ElementRef;

  constructor(private fb: FormBuilder,
              public element: ElementRef,
              private listService: ListService,
              private ticketService: TicketService) {
  }


  @Input()
  set list(list: List) {
    this._list = list;
    this.load();
  }

  get list() {
    return this._list;
  }

  tickets: Ticket[] = [];
  // loading = {
  //   tickets: false,
  //   adding: false
  // };
  loading: boolean;

  private load(): void {
    // this.loading.tickets = true;
    this.loading = true;
    this.ticketService.getTickets(this.list.id)
      // .pipe(finalize(() => this.loading.tickets = false))
      .pipe(finalize(() => this.loading = false))
      .subscribe(tickets => {
        this.tickets = tickets;
      });
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

  track(index, ticket: Ticket) {
    return ticket.id;
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
    this.title = this.list.title;
    this.titleControl.setValue(this.list.title);
    this.titleControl.valueChanges.subscribe(title => this.list.title = title);
  }
}
