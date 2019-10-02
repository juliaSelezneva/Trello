import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalOptions, ModalService, UI } from 'junte-ui';
import { ListService } from '../list.service';
import { List, Ticket } from '../list/list.models';
import { Mode } from '../modes-enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-canban',
  templateUrl: './canban.component.html',
  styleUrls: ['./canban.component.scss']
})
export class CanbanComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private listService: ListService,
              private modalService: ModalService,
              private router: Router) {
  }

  ui = UI;

  @ViewChild('contentModal', {static: false})
  contentModal: TemplateRef<any>;

  @ViewChild('footer', {static: false})
  footer: TemplateRef<any>;

  listForm = this.fb.group({
    title: [null],
  });

  modalForm = this.fb.group({
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

  updateTicket(ticket: Ticket) {
    // const title = this.modalForm.controls['estimate'].value;
    const title = '123';
    console.log(title);
    console.log(ticket);
    if (!title) {
      return;
    }
    title.trim();
    ticket.title = title;
    this.listService.updateTicket(ticket)
      .subscribe(t => ticket.title = t);
  }

  openModal() {
    const options = new ModalOptions({
      title: {
        text: 'Edit ticket',
      },
      maxWidth: '800px'
    });
    this.modalService.open(this.contentModal, this.footer, options);
  }

  ngOnInit() {
    this.getLists();
  }

}
