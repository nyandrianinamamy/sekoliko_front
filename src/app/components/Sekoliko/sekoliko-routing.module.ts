import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SekolikoComponent} from './sekoliko.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {PrincipalInterfaceComponent} from './principal-interface/principal-interface.component';

const routes: Routes = [
  {
    path: '',
    component: SekolikoComponent,
    children: [
      {path: '', redirectTo: 'principal-interface'},
      {path: 'not-found', component: NotFoundComponent},
      {path: 'principal-interface', component: PrincipalInterfaceComponent},
      {path: 'etudiant', loadChildren: 'src/app/components/Sekoliko/Etudiant/etudiant.module#EtudiantModule'},
      { path: '**', redirectTo: 'not-found' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SekolikoRoutingModule { }
