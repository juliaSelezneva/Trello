import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { UI } from 'junte-ui';
import { List } from './list';
import { FormBuilder } from '@angular/forms';
import { ListService } from '../list.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  ui = UI;

  @Input() title: string;

  @ContentChild('actionsList', {static: false})
  actionsList: TemplateRef<any>;

  ngOnInit() {
  }

}
