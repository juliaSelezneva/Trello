import { Component, ComponentFactoryResolver, ElementRef, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalOptions, ModalService, UI } from 'junte-ui';
import { List } from '../../models/list';
import { FormBuilder, FormControl } from '@angular/forms';
import { ListService } from '../../services/list.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket';
import { finalize, map } from 'rxjs/operators';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';

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
  tickets: Ticket[] = [];

  progress = {tickets: false, deleting: false, editing: false};

  listForm = this.fb.group({
    id: [],
    title: this.titleControl
  });

  @Output() deleted = new EventEmitter<any>();

  @Input() connections: string[] = [];

  @Input()
  set list(list: List) {
    if (!this.list || list.id !== this.list.id) {
      this._list = list;
      this.load();
    }
    this.listForm.patchValue(list as { [key: string]: any });
  }

  get list() {
    return this._list;
  }

  constructor(private fb: FormBuilder,
              public element: ElementRef,
              private listService: ListService,
              private ticketService: TicketService,
              private modalService: ModalService,
              private injector: Injector,
              private cfr: ComponentFactoryResolver) {
  }

  private load(): void {
    this.progress.tickets = true;
    this.ticketService.getTickets(this.list.id)
      .pipe(finalize(() => this.progress.tickets = false))
      .subscribe(tickets => {
        this.tickets = tickets;
      });
  }

  delete(): void {
    this.progress.deleting = true;
    this.listService.deleteList(this.list.id)
      .pipe(finalize(() => this.progress.deleting = false))
      .subscribe(() => this.deleted.emit());
  }

  edit(): void {
    // !this.list.title ? this.titleControl.patchValue(title) : title = list.title;
    this.progress.editing = true;
    this.listService.updateList(this.list.id, this.listForm.getRawValue())
      .pipe(finalize(() => this.progress.editing = false))
      .subscribe(list => {
        this.list = list;
      });

  }

  confirm() {
    const component = this.cfr.resolveComponentFactory(ConfirmDeleteComponent).create(this.injector);
    component.instance.message = 'Are you sure you want to delete this list?';
    component.instance.deleted.subscribe(() => {
      this.delete();
      this.modalService.close();
    });
    component.instance.closed.subscribe(() => this.modalService.close());
    const options = new ModalOptions({
      title: {
        text: 'Delete',
        icon: UI.icons.font.delete
      }
    });
    this.modalService.open(component, null, options);
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
