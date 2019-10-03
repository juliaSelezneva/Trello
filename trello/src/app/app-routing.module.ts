import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanbanComponent } from './canban/canban.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/canban', pathMatch: 'full'},
  { path: 'canban', component: CanbanComponent },
  { path: 'tickets/:id', component: TicketDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
