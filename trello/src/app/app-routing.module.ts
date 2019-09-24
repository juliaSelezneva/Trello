import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanbanComponent } from './canban/canban.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: '', redirectTo: '/lists', pathMatch: 'full'},
  { path: 'lists', component: CanbanComponent },
  { path: 'lists/:id', component: ListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
