import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrationComponent } from './administration.component';
import { ListAdministrationComponent } from './list-administration/list-administration.component';

const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent,
    children: [
      {path: '', redirectTo: 'list-administration'},
      {path: 'list-administration', component: ListAdministrationComponent},
      {path: '**', redirectTo: 'list-administration'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
