import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalComponent, ModalService, PopoverComponent, PopoverService, UI } from 'junte-ui';
import { List } from './models/list';
import { Ticket } from './models/ticket';
import { Label } from './models/enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  title = 'trello';

  ui = UI;

  lists = [
    new List('Issue', 11),
    new List('Doing', 12),
    new List('Done', 13),
    new List('Delay', 14),
  ];

  tickets = [
    new Ticket('Create kanban component', 1, new Date(2019, 9, 3), '2h', [Label.delay, Label.doing], 11),
    new Ticket('Refactor components', 2, new Date(2019, 10, 3), '2h', null, 11),
    new Ticket('Implement list', 3, new Date(2019, 10, 4), null, null, 12),
    new Ticket('Add ticket in list', 4, new Date(2019, 9, 5), '', [Label.doing], 12),
    new Ticket('Sort tickets', 5, new Date(2019, 10, 20), null, null, 13),
    new Ticket('Refactor list', 6, new Date(2019, 9, 25), '5h 30m', null, 13),
  ];

  @ViewChild('modal', {static: false}) modal: ModalComponent;
  @ViewChild('layout', {read: ElementRef, static: true}) backdrop;
  @ViewChild('popover', {static: false}) popover: PopoverComponent;

  constructor(private modalService: ModalService,
              private popoverService: PopoverService) {
  }

  ngOnInit() {
    // const serialLists = JSON.stringify(this.lists);
    // const serialTickets = JSON.stringify(this.tickets);
    // localStorage.setItem('lists', serialLists);
    // localStorage.setItem('tickets', serialTickets);
  }

  ngAfterViewInit() {
    this.modalService.register(this.modal);
    this.popoverService.register(this.popover);
  }

}
