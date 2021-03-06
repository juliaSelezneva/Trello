import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalComponent, ModalService, PopoverComponent, PopoverService, UI } from 'junte-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  title = 'trello';

  ui = UI;

  @ViewChild('modal', {static: false}) modal: ModalComponent;
  @ViewChild('layout', {read: ElementRef, static: true}) backdrop;
  @ViewChild('popover', {static: false}) popover: PopoverComponent;

  constructor(private modalService: ModalService,
              private popoverService: PopoverService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.modalService.register(this.modal);
    this.popoverService.register(this.popover);
  }

}
