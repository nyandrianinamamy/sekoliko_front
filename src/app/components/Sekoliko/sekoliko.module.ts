import {NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {HttpClientModule} from '@angular/common/http';

import {SekolikoRoutingModule} from './sekoliko-routing.module';
import {SekolikoComponent} from './sekoliko.component';
import {MaterialModule} from '../../Utils/modules/Material.module';
import {DataTablesModule} from 'angular-datatables';
import {
    MatButtonModule, MatButtonToggleModule,
    MatCardModule, MatCheckboxModule, MatDatepickerModule, MatExpansionModule, MatFormFieldModule,
    MatGridListModule,
    MatIconModule, MatInputModule,
    MatListModule, MatMenuModule, MatPaginatorModule, MatRadioModule, MatSelectModule,
    MatSidenavModule, MatTableModule,
    MatToolbarModule
} from '@angular/material';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NotFoundComponent} from './not-found/not-found.component';
import {NavMenuComponent} from './nav-menu/nav-menu.component';
import {FooterComponent} from './footer/footer.component';
import {TzDashboardComponent} from './tz-dashboard/tz-dashboard.component';
import {TzEtudiantsComponent} from './tz-etudiants/tz-etudiants.component';
import {TzSalleComponent} from './tz-salle/tz-salle.component';
import {TzPayementsComponent} from './tz-payements/tz-payements.component';
import {TzProfsComponent} from './tz-profs/tz-profs.component';
import {TzAdministrationComponent} from './tz-administration/tz-administration.component';
import {ListEtudiantsComponent} from './tz-etudiants/list-etudiants/list-etudiants.component';
import {TzClasseComponent} from './tz-etudiants/tz-classe/tz-classe.component';
import {TzAjoutEtudiantComponent} from './tz-etudiants/tz-ajout-etudiant/tz-ajout-etudiant.component';
import {TzListProfsComponent} from './tz-profs/tz-list-profs/tz-list-profs.component';
import {TzAjoutProfsComponent} from './tz-profs/tz-ajout-profs/tz-ajout-profs.component';
import {TzAdmDetailsComponent} from './tz-administration/tz-adm-details/tz-adm-details.component';
import { TzAjoutSalleComponent } from './tz-salle/tz-ajout-salle/tz-ajout-salle.component';
import { TzAjoutAdminComponent } from './tz-administration/tz-ajout-admin/tz-ajout-admin.component';
import { TzClasseListComponent} from './tz-classe-list/tz-classe-list.component';
import { TzAjoutClasseComponent } from './tz-classe-list/tz-ajout-classe/tz-ajout-classe.component';
import { TzMatiereComponent } from './tz-matiere/tz-matiere.component';
import { TzAjoutMatiereComponent } from './tz-matiere/tz-ajout-matiere/tz-ajout-matiere.component';
import {RadarSpinnerModule} from 'angular-epic-spinners';
import { TzProfileComponent } from './tz-profile/tz-profile.component';
import { TzUserComponent } from './tz-user/tz-user.component';
import { TzInscriptionComponent } from './tz-inscription/tz-inscription.component';
import { TzFonctionProfComponent } from './tz-profs/tz-fonction-prof/tz-fonction-prof.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        SekolikoRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        FormsModule,
        MatListModule,
        MatGridListModule,
        FlexLayoutModule,
        MatCardModule,
        MatExpansionModule,
        MatMenuModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        MatButtonToggleModule,
        MatInputModule,
        RadarSpinnerModule,
        MatPaginatorModule,
        MatRadioModule,
        MatDatepickerModule,
        MatTableModule,
        MaterialModule,
        DataTablesModule,
        MDBBootstrapModule.forRoot(),
    ], schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        SekolikoComponent,
        TzDashboardComponent,
        TzEtudiantsComponent,
        TzSalleComponent,
        FooterComponent,
        NotFoundComponent,
        TzProfsComponent,
        TzPayementsComponent,
        NavMenuComponent,
        TzAdministrationComponent,
        ListEtudiantsComponent,
        TzClasseComponent,
        TzAjoutEtudiantComponent,
        TzAjoutProfsComponent,
        TzListProfsComponent,
        TzAjoutSalleComponent,
        TzAdmDetailsComponent,
        TzAjoutAdminComponent,
        TzClasseListComponent,
        TzAjoutClasseComponent,
        TzMatiereComponent,
        TzAjoutMatiereComponent,
        TzUserComponent,
        TzInscriptionComponent,
        TzProfileComponent,
        TzFonctionProfComponent
    ]
})
export class SekolikoModule {
}
