import { Component, ContentChildren, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UI } from 'junte-ui';
import { ListService } from '../list.service';
import { List } from '../list/list';
import { Mode } from '../modes-enum';
import { ListComponent } from '../list/list.component';

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
  modelist = this.mode.view;

  lists: List[];

  constructor(private fb: FormBuilder, private listService: ListService) {
  }

  getLists(): void {
    this.listService.getLists()
      .subscribe(lists => this.lists = lists);
  }

  add(): void {
    const title = this.listForm.controls['title'].value;
    if (!title) {
      return;
    }
    title.trim();
    this.listService.addList({title} as List)
      .subscribe(list => {
        this.lists.push(list);
      });
    this.listForm.reset();
  }

  ngOnInit() {
    this.getLists();
  }

}
