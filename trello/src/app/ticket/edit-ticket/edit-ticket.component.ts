import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss']
})
export class EditTicketComponent implements OnInit {

  constructor(private fb: FormBuilder) {
  }

  @Input() title: string;

  titleControl = new FormControl(null);

  editForm = this.fb.group({
    title: this.titleControl
  });

  ngOnInit() {
    this.titleControl.setValue(this.title);
  }

}
