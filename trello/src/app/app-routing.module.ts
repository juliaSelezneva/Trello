import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanbanComponent } from './canban/canban.component';
import { TicketComponent } from './ticket/ticket.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: '', redirectTo: '/canban', pathMatch: 'full'},
  { path: 'canban', component: CanbanComponent },
  { path: 'canban/lists/:id', component: ListComponent },
  { path: 'lists/tickets/:id', component: TicketComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
