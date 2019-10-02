import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalOptions, ModalService, UI } from 'junte-ui';
import { ListService } from '../list.service';
import { List, Ticket } from '../list/list';
import { Mode } from '../modes-enum';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ListComponent } from '../list/list.component';
import { TicketComponent } from '../ticket/ticket.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-canban',
  templateUrl: './canban.component.html',
  styleUrls: ['./canban.component.scss']
})
export class CanbanComponent implements OnInit {

  ui = UI;

  @ViewChild('contentModal', {static: false})
  contentModal: TemplateRef<any>;

  @ViewChild('footer', {static: false})
  footer: TemplateRef<any>;

  listForm = this.fb.group({
    title: [null],
  });

  ticketForm = this.fb.group({
    content: [null],
  });

  modalForm = this.fb.group({
    title: [null],
  });

  mode = Mode;
  listmode = this.mode.view;

  lists: List[];
  ticket: Ticket;

  constructor(private fb: FormBuilder,
              private listService: ListService,
              private modalService: ModalService,
              private router: Router) {
  }

  getLists(): void {
    this.listService.getLists()
      .subscribe(lists => this.lists = lists);
  }

  addList(): void {
    const title = this.listForm.controls['title'].value;
    if (!title) {
      return;
    }
    title.trim();
    this.listService.addList(new List(title))
      .subscribe(list => {
        this.lists.push(list);
      });
    this.listForm.reset();
  }

  addTicket(idlist: number): void {
    const content = this.ticketForm.controls['content'].value;
    if (!content) {
      return;
    }
    content.trim();
    this.listService.addTicket(new Ticket(content))
      .subscribe(ticket => {
        const findlist = this.lists.find(list => list.id === idlist);
        findlist.tickets.push(ticket);
        findlist.mode = this.mode.view;
      });
    this.ticketForm.reset();
  }

  updateTicket(ticket: Ticket) {
    // const title = this.modalForm.controls['estimate'].value;
    const title = '123';
    console.log(title);
    console.log(ticket);
    if (!title) {
      return;
    }
    title.trim();
    ticket.title = title;
    this.listService.updateTicket(ticket)
      .subscribe(t => ticket.title = t);
  }


  droppedTicket(event: CdkDragDrop<string[]>, idlist) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        this.lists[this.lists.findIndex(list => list.id === idlist)].tickets,
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

  openModal() {
    const options = new ModalOptions({
      title: {
        text: 'Edit ticket',
      },
      maxWidth: '800px'
    });
    this.modalService.open(this.contentModal, this.footer, options);
  }

  ngOnInit() {
    this.getLists();
  }

}
