import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UI } from 'junte-ui';
import { ListService } from '../list.service';
import { List, Ticket } from '../list/list.models';
import { Mode } from '../modes-enum';

@Component({
  selector: 'app-canban',
  templateUrl: './canban.component.html',
  styleUrls: ['./canban.component.scss']
})
export class CanbanComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private listService: ListService) {
  }

  ui = UI;

  listForm = this.fb.group({
    title: [null],
  });

  mode = Mode;
  listmode = this.mode.view;

  lists: List[];
  ticket: Ticket;

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

  ngOnInit() {
    this.getLists();
  }

}
