import { Component, ContentChildren, OnInit, QueryList } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UI } from 'junte-ui';
import { ListService } from '../list.service';
import { List } from '../list/list';
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

  lists: List[];

  getLists(): void {
    this.listService.getLists()
      .subscribe(lists => this.lists = lists);
  }

  add(title: string): void {
    title = title.trim();
    if (!title) {
      return;
    }
    this.listService.addList({ title } as List)
      .subscribe(list => {
        this.lists.push(list);
      });
  }

  constructor(private fb: FormBuilder, private listService: ListService) {
  }

  ngOnInit() {
    this.getLists();
  }

}
