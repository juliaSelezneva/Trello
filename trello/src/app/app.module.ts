import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JunteUiModule } from 'junte-ui';
import { CanbanComponent } from './canban/canban.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { TicketComponent } from './ticket/ticket.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    CanbanComponent,
    ListComponent,
    TicketComponent,
    TicketDetailComponent
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
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
