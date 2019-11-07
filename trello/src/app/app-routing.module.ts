import { NgModule } from '@angular/core';
import { Data, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { KanbansListComponent } from './components/kanbans/kanbans-list/kanbans-list.component';
import { KanbanComponent } from './components/kanbans/kanban/kanban.component';
import { TicketDetailComponent } from './components/tickets/ticket-detail/ticket-detail.component';
import { KanbanResolver } from './resolvers/kanban';
import { TicketResolver } from './resolvers/ticket';
import { OutletComponent } from './components/shared/outlet/outlet.component';

export function getKanban(data: Data) {
  return data.kanban.title;
}

export function getTicket(data: Data) {
  return data.ticket.title;
}

const routes: Routes = [
  {
    path: '',
    redirectTo: 'kanbans',
    pathMatch: 'full'
  },
  {
    path: 'kanbans',
    component: OutletComponent,
    data: {breadcrumb: 'Kanbans'},
    children: [
      {
        path: '',
        component: KanbansListComponent,
      },
      {
        path: ':kanban',
        data: {breadcrumb: getKanban},
        component: OutletComponent,
        resolve: {kanban: KanbanResolver},
        children: [
          {
            path: '',
            component: KanbanComponent,
          },
          {
            path: 'tickets',
            component: OutletComponent,
            children: [
              {
                path: ':ticket',
                data: {breadcrumb: getTicket},
                component: TicketDetailComponent,
                resolve: {ticket: TicketResolver}
              }
            ]
          },
        ]
      },
    ],
  },
  {
    path: 'home',
    data: {breadcrumb: 'Home'},
    component: HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}


