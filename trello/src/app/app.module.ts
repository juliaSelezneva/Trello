import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JunteUiModule } from 'junte-ui';
import { KanbanComponent } from './components/kanban/kanban.component';
import { ListComponent } from './components/list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { TicketComponent } from './components/tickets/ticket/ticket.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TicketDetailComponent } from './components/tickets/ticket-detail/ticket-detail.component';
import { EditTicketComponent } from './components/tickets/edit-ticket/edit-ticket.component';
import { AddListComponent } from './components/list/add-list/add-list.component';
import { AddTicketComponent } from './components/tickets/add-ticket/add-ticket.component';
import { ArrayPipesModule } from './pipes/array-pipes.module';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    KanbanComponent,
    ListComponent,
    TicketComponent,
    TicketDetailComponent,
    EditTicketComponent,
    AddListComponent,
    AddTicketComponent,
    ConfirmDeleteComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    JunteUiModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule,
    ArrayPipesModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false, delay: 2000 }
    )
  ],
  entryComponents: [
    EditTicketComponent,
    ConfirmDeleteComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
