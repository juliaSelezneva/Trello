import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EditMode } from '../../../models/enum';
import { UI } from 'junte-ui';
import { List } from '../../../models/list';
import { FormBuilder, Validators } from '@angular/forms';
import { ListService } from '../../../services/list.service';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss']
})
export class AddListComponent {

  ui = UI;
  editMode = EditMode;
  mode = EditMode.view;

  listForm = this.fb.group({
    title: [null, Validators.required],
  });

  @Output()
  added = new EventEmitter<List>();

  constructor(private fb: FormBuilder,
              private listService: ListService) {
  }

  addList(): void {
    this.listService.addList(this.listForm.getRawValue())
      .subscribe(list => {
        this.added.emit(list);
        this.listForm.reset();
      });
  }

}
