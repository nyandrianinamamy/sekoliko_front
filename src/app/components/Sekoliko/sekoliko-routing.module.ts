import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SekolikoComponent} from './sekoliko.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {TzDashboardComponent} from './tz-dashboard/tz-dashboard.component';
import {TzEtudiantsComponent} from './tz-etudiants/tz-etudiants.component';
import {TzSalleComponent} from './tz-salle/tz-salle.component';
import {TzPayementsComponent} from './tz-payements/tz-payements.component';
import {TzAdministrationComponent} from './tz-administration/tz-administration.component';
import {ListEtudiantsComponent} from './tz-etudiants/list-etudiants/list-etudiants.component';
import {TzClasseComponent} from './tz-etudiants/tz-classe/tz-classe.component';
import {TzAjoutEtudiantComponent} from './tz-etudiants/tz-ajout-etudiant/tz-ajout-etudiant.component';
import {TzListProfsComponent} from './tz-profs/tz-list-profs/tz-list-profs.component';
import {TzAjoutProfsComponent} from './tz-profs/tz-ajout-profs/tz-ajout-profs.component';
import {TzProfsComponent} from './tz-profs/tz-profs.component';
import {TzAdmDetailsComponent} from './tz-administration/tz-adm-details/tz-adm-details.component';
import {TzAjoutSalleComponent} from './tz-salle/tz-ajout-salle/tz-ajout-salle.component';
import { TzAjoutAdminComponent } from './tz-administration/tz-ajout-admin/tz-ajout-admin.component';
import {TzClasseListComponent} from './tz-classe-list/tz-classe-list.component';
import { TzAjoutClasseComponent} from './tz-classe-list/tz-ajout-classe/tz-ajout-classe.component';
import {TzMatiereComponent} from "./tz-matiere/tz-matiere.component";
import {TzAjoutMatiereComponent} from "./tz-matiere/tz-ajout-matiere/tz-ajout-matiere.component";
import {TzUserComponent} from './tz-user/tz-user.component';
import {TzInscriptionComponent} from './tz-inscription/tz-inscription.component';
import {TzProfileComponent} from "./tz-profile/tz-profile.component";
import {TzFonctionProfComponent} from './tz-profs/tz-fonction-prof/tz-fonction-prof.component';

const routes: Routes = [
    {
        path: '',
        component: SekolikoComponent,
        children: [
            {path: '', redirectTo: 'dashboard'},
            {path: 'user', loadChildren: 'src/app/components/Sekoliko/user-manage/user-manage.module#UserManageModule'},
            {path: 'not-found', component: NotFoundComponent},
            {path: 'dashboard', component: TzDashboardComponent},
            {path: 'etudiant', component: TzEtudiantsComponent},
            {path: 'salle', component: TzSalleComponent},
            {path:  'add-salle', component: TzAjoutSalleComponent},
            {path: 'list-etudiant/:id', component: ListEtudiantsComponent},
            {path: 'add-etudiant', component: TzAjoutEtudiantComponent},
            {path: 'payement', component: TzPayementsComponent},
            {path: 'administratif', component: TzAdministrationComponent},
            {path: 'add-admin', component: TzAjoutAdminComponent},
            {path: 'fonction/:id', component: TzFonctionProfComponent},
            {path: 'ajout-utilisateur/:type', component: TzUserComponent},
            {path: 'ajout-prof/:type', component: TzUserComponent},
            {path: 'classe/:id', component: TzClasseComponent},
            {path: 'profs', component: TzProfsComponent},
            {path: 'inscription/:id', component: TzInscriptionComponent},
            {path: 'list-prof', component: TzListProfsComponent},
            {path: 'add-prof', component: TzAjoutProfsComponent},
            {path: 'details-prof', component: TzAdmDetailsComponent},
            {path: 'list-classe', component: TzClasseListComponent},
            {path: 'add-classe', component: TzAjoutClasseComponent},
            {path: 'matiere-list', component: TzMatiereComponent},
            {path: 'add-matiere', component: TzAjoutMatiereComponent},
            {path: 'profile', component: TzProfileComponent},
            {path: '**', redirectTo: 'not-found'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SekolikoRoutingModule {
}
