import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalOptions, ModalService, UI } from 'junte-ui';
import { List, Ticket } from './list.models';
import { Mode } from '../enum';
import { FormBuilder } from '@angular/forms';
import { ListService } from '../list.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private listService: ListService,
              private modalService: ModalService) {
  }

  ui = UI;

  @Input() title: string;
  @Input() list: List;
  mode = Mode;

  @ViewChild('contentModal', {static: false})
  contentModal: TemplateRef<any>;

  @ViewChild('footerModal', {static: false})
  footerModal: TemplateRef<any>;

  ticketForm = this.fb.group({
    title: [null],
  });

  modalForm = this.fb.group({
    title: [null],
  });


  addTicket(): void {
    const title = this.ticketForm.controls['title'].value;
    if (!title) {
      return;
    }
    title.trim();
    this.listService.addTicket(new Ticket(title))
      .subscribe(ticket => {
        this.list.tickets.push(ticket);
        this.list.mode = this.mode.view;
      });
    this.ticketForm.reset();
  }

  droppedTicket(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        this.list.tickets,
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

  openModal() {
    const options = new ModalOptions({
      title: {
        text: 'Edit ticket',
      },
      maxWidth: '800px'
    });
    this.modalService.open(this.contentModal, this.footerModal, options);
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
