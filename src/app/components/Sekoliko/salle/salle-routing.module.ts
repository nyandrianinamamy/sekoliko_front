import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SalleComponent} from './salle.component';
import {ListSalleComponent} from './list-salle/list-salle.component';

const routes: Routes = [
  {
    path: '',
    component: SalleComponent,
    children: [
      {path: '', redirectTo: 'list-salle'},
      {path: 'list-salle', component: ListSalleComponent},
      { path: '**', redirectTo: 'list-etudiant' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalleRoutingModule { }
