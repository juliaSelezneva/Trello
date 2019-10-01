import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { UI } from 'junte-ui';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent {

  ui = UI;

  @Input() title: string;

  @ContentChild('actionsList', {static: false})
  actionsList: TemplateRef<any>;

}
