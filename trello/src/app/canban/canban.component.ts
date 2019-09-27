import { Component, ContentChildren, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UI } from 'junte-ui';
import { ListService } from '../list.service';
import { List, Ticket } from '../list/list';
import { Mode } from '../modes-enum';
import { ListComponent } from '../list/list.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { EventEmitter } from 'events';

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

  @ViewChildren(ListComponent) listComp: QueryList<ListComponent>;

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

  // @Output('cdkDropDropped')
  dropped(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.lists,
      event.previousIndex,
      event.currentIndex
    );
    console.log(this.lists);
  }

  ngOnInit() {
    this.getLists();
  }

}
