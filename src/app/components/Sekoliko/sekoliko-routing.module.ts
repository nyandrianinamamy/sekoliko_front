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
import {TzAjoutProfsComponent} from './tz-profs/tz-ajout-profs/tz-ajout-profs.component';
import {TzProfsComponent} from './tz-profs/tz-profs.component';
import {TzAjoutSalleComponent} from './tz-salle/tz-ajout-salle/tz-ajout-salle.component';
import {TzClasseListComponent} from './tz-classe-list/tz-classe-list.component';
import { TzAjoutClasseComponent} from './tz-classe-list/tz-ajout-classe/tz-ajout-classe.component';
import {TzMatiereComponent} from "./tz-matiere/tz-matiere.component";
import {TzAjoutMatiereComponent} from "./tz-matiere/tz-ajout-matiere/tz-ajout-matiere.component";
import {TzUserComponent} from './tz-user/tz-user.component';
import {TzInscriptionComponent} from './tz-inscription/tz-inscription.component';
import {TzProfileComponent} from "./tz-profile/tz-profile.component";
import {TzFonctionProfComponent} from './tz-profs/tz-fonction-prof/tz-fonction-prof.component';
import { TzEdtComponent } from './tz-edt/tz-edt.component';
import {TzClasseEnfantComponent} from "./tz-classe-enfant/tz-classe-enfant.component";
import {TzAddEnfantComponent} from "./tz-classe-enfant/tz-add-enfant/tz-add-enfant.component";
import {AjoutNoteComponent} from './tz_note/ajout-note/ajout-note.component';
import {TzAnneScolaireComponent} from "./tz-anne-scolaire/tz-anne-scolaire.component";
import {TzPayementsAjoutComponent} from "./tz-payements/tz-payements-ajout/tz-payements-ajout.component";

const routes: Routes = [
    {
        path: '',
        component: SekolikoComponent,
        children: [
            {path: '', redirectTo: 'dashboard'},
            {path: 'user', loadChildren: 'src/app/components/Sekoliko/user-manage/user-manage.module#UserManageModule'},
            {path: 'not-found', component: NotFoundComponent},
            {path: 'dashboard', component: TzDashboardComponent},
            {path: 'anne', component: TzAnneScolaireComponent},
            {path: 'etudiant', component: TzEtudiantsComponent},
            {path: 'salle', component: TzSalleComponent},
            {path:  'add-salle', component: TzAjoutSalleComponent},
            {path: 'list-etudiant/:id', component: ListEtudiantsComponent},
            {path: 'add-etudiant', component: TzAjoutEtudiantComponent},
            {path: 'payement', component: TzPayementsComponent},
            {path: 'add-payement', component: TzPayementsAjoutComponent},
            {path: 'administratif', component: TzAdministrationComponent},
            {path: 'fonction/:id', component: TzFonctionProfComponent},
            {path: 'ajout-utilisateur/:type', component: TzUserComponent},
            {path: 'ajout-prof/:type', component: TzUserComponent},
            {path: 'classe/:id', component: TzClasseComponent},
            {path: 'profs', component: TzProfsComponent},
            {path: 'inscription/:id', component: TzInscriptionComponent},
            {path: 'add-prof', component: TzAjoutProfsComponent},
            {path: 'list-classe', component: TzClasseListComponent},
            {path: 'add-classe', component: TzAjoutClasseComponent},
            {path: 'matiere-list/:id', component: TzMatiereComponent},
            {path: 'add-matiere', component: TzAjoutMatiereComponent},
            {path: 'add-matiere/:id', component: TzAjoutMatiereComponent},
            {path: 'edt/:id', component: TzEdtComponent},
            {path: 'list-classe-eft', component: TzClasseEnfantComponent},
            {path: 'add-eft', component: TzAddEnfantComponent},
            {path: 'profile', component: TzProfileComponent},
            {path: 'note/:id/:idClasse', component: AjoutNoteComponent},
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
