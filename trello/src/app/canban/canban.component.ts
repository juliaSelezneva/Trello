import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalOptions, ModalService, UI } from 'junte-ui';
import { ListService } from '../list.service';
import { List, Ticket } from '../list/list';
import { Mode } from '../modes-enum';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ListComponent } from '../list/list.component';
import { TicketComponent } from '../ticket/ticket.component';
import { ActivatedRoute } from '@angular/router';

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
    estimate: [null],
  });

  mode = Mode;
  listmode = this.mode.view;

  lists: List[];
  list: List;
  tickets: Ticket[];
  ticket: Ticket;

  constructor(private fb: FormBuilder,
              private listService: ListService,
              private modalService: ModalService,
              private route: ActivatedRoute) {
  }

  getLists(): void {
    this.listService.getLists()
      .subscribe(lists => this.lists = lists);
  }

  getTickets(): void {
    this.listService.getTickets()
      .subscribe(tickets => this.tickets = tickets);
  }

  getTicket(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.listService.getTicket(id)
      .subscribe(ticket => this.tickets[0] = ticket[0]);
  }

  getList(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.listService.getList(id)
      .subscribe(list => this.list = list);
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

  addTicket(list_id: number): void {
    const content = this.ticketForm.controls['content'].value;
    if (!content) {
      return;
    }
    content.trim();
    this.listService.addTicket(new Ticket(content, list_id))
      .subscribe(ticket => {
        const findlist = this.lists.find(list => list.id === list_id);
        this.tickets.push(ticket);
        findlist.mode = this.mode.view;
      });
    this.ticketForm.reset();
  }

  updateTicket(ticket: Ticket) {
    const estimate = this.ticketForm.controls['estimate'].value;
    if (!estimate) {
      return;
    }
    estimate.trim();
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
    if (a.content < b.content) {
      return -1;
    }
    if (a.content > b.content) {
      return 1;
    }
    return 0;
  }


  compareDown(a, b) {
    if (a.content > b.content) {
      return -1;
    }
    if (a.content < b.content) {
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
    this.getTickets();
    this.getList();
  }

}
