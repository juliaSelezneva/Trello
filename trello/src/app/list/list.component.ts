import { Component, Input, OnInit } from '@angular/core';
import { ModalService, UI } from 'junte-ui';
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
              private listService: ListService) {
  }

  ui = UI;

  @Input() list: List;
  mode = Mode;

  ticketForm = this.fb.group({
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
