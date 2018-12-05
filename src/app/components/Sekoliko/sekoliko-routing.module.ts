import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SekolikoComponent} from './sekoliko.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {TzDashboardComponent} from './tz-dashboard/tz-dashboard.component';
import {TzEtudiantsComponent} from './tz-etudiants/tz-etudiants.component';
import {TzSalleComponent} from './tz-salle/tz-salle.component';
import {TzProfsComponent} from './tz-profs/tz-profs.component';
import {TzPayementsComponent} from './tz-payements/tz-payements.component';
import {TzAdministrationComponent} from './tz-administration/tz-administration.component';

const routes: Routes = [
  {
    path: '',
    component: SekolikoComponent,
    children: [
      {path: '', redirectTo: 'principal-interface'},
      {path: 'not-found', component: NotFoundComponent},
      {path: 'dashboard', component: TzDashboardComponent},
      {path: 'etudiant', component: TzEtudiantsComponent},
      {path: 'profs', component: TzProfsComponent},
      {path: 'salle', component: TzSalleComponent},
      {path: 'payement', component: TzPayementsComponent},
      {path: 'administratif', component: TzAdministrationComponent},
      { path: '**', redirectTo: 'not-found' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SekolikoRoutingModule { }
