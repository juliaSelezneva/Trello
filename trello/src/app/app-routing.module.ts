import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { KanbansListComponent } from './components/kanbans/kanbans-list/kanbans-list.component';
import { KanbanComponent } from './components/kanbans/kanban/kanban.component';
import { Kanban } from './models/kanban';
import { TicketDetailComponent } from './components/tickets/ticket-detail/ticket-detail.component';
import { KanbansComponent } from './components/kanbans/kanbans.component';

export function getKanban(data: Kanban) {
  return data.title;
}

const routes: Routes = [
  {
    path: '',
    redirectTo: 'kanbans',
    pathMatch: 'full'
  },
  {
    path: 'kanbans',
    component: KanbansComponent,
    data: {breadcrumb: 'Kanbans'},
    children: [
      {
        path: '',
        component: KanbansListComponent,
      },
      {
        path: ':id',
        data: {breadcrumb: getKanban},
        component: KanbanComponent
      }
    ],
  },
  {
    path: 'home',
    data: {breadcrumb: 'Home'},
    component: HomeComponent
  },

  {
    path: 'tickets/:id',
    component: TicketDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}


