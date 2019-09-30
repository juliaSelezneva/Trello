import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UI } from 'junte-ui';
import { ListService } from '../list.service';
import { List, Ticket } from '../list/list';
import { Mode } from '../modes-enum';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-canban',
  templateUrl: './canban.component.html',
  styleUrls: ['./canban.component.scss']
})
export class CanbanComponent implements OnInit {

  ui = UI;

  listForm = this.fb.group({
    title: [null],
  });

  ticketForm = this.fb.group({
    content: [null],
  });

  mode = Mode;
  listmode = this.mode.view;

  lists: List[];

  constructor(private fb: FormBuilder, private listService: ListService) {
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

  ngOnInit() {
    this.getLists();
  }

}
