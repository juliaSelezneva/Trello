import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KanbanComponent } from './components/kanban/kanban.component';
import { TicketDetailComponent } from './components/tickets/ticket-detail/ticket-detail.component';
import { BoardComponent } from './components/board/board.component';

const routes: Routes = [
  {path: 'board', component: BoardComponent},
  {path: 'kanbans/:id', component: KanbanComponent},
  {path: 'tickets/:id', component: TicketDetailComponent},
  {path: '', redirectTo: '/board', pathMatch: 'full'},
  {path: '**', redirectTo: '/board'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}


// {
//   path: 'kanbans',
//     component: KanbansComponent,
//   children: [
//   {
//     path: '',
//     component: KanbansListComponent,
//   },
//   {
//     path: ':id',
//     component: KanbanComponent,
//   }
// ]
// }
