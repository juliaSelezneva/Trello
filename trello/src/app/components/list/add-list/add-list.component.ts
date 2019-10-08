import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Input() list: List;

  listForm = this.fb.group({
    title: [null, Validators.required],
  });

  @Output()
  added = new EventEmitter<List>();

  constructor(private fb: FormBuilder,
              private listService: ListService) {
  }

  add(): void {
    this.listService.addList(this.listForm.getRawValue())
      .subscribe(list => {
        this.list = list;
        this.added.emit(list);
        this.listForm.reset();
        this.mode = EditMode.view;
      });
  }

}
