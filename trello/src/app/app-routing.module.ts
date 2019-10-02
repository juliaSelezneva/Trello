import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanbanComponent } from './canban/canban.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: '', redirectTo: '/canban', pathMatch: 'full'},
  { path: 'canban', component: CanbanComponent },
  { path: 'canban/:id', component: ListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
