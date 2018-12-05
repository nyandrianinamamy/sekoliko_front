import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EtudiantComponent} from './etudiant.component';
import {ListEtudiantComponent} from './list-etudiant/list-etudiant.component';

const routes: Routes = [
  {
    path: '',
    component: EtudiantComponent,
    children: [
      {path: '', redirectTo: 'list-etudiant'},
      {path: 'list-etudiant', component: ListEtudiantComponent},
      { path: '**', redirectTo: 'list-etudiant' }
    ]
    
  }
];
// const routes:Routes=[
//   {path: '', component: EtudiantComponent},
//   {path:'list',component:ListEtudiantComponent},
//   // {path:'contact',component:RegisterComponent},
//   {path:'',redirectTo:'/list',pathMatch:'full'}
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtudiantRoutingModule { }
