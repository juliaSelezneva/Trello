import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KanbanComponent } from './components/kanban/kanban.component';
import { TicketDetailComponent } from './components/tickets/ticket-detail/ticket-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/kanban', pathMatch: 'full'},
  { path: 'kanban', component: KanbanComponent },
  { path: 'tickets/:id', component: TicketDetailComponent },
  { path: '**', redirectTo: '/kanban' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
