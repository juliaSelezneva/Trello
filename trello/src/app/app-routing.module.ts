import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanbanComponent } from './canban/canban.component';
import { ListComponent } from './list/list.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/canban', pathMatch: 'full'},
  { path: 'canban', component: CanbanComponent },
  { path: 'lists/:id', component: ListComponent },
  { path: 'tickets/:id', component: TicketDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
