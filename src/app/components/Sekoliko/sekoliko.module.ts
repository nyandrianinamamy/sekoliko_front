import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SekolikoRoutingModule } from './sekoliko-routing.module';
import {SekolikoComponent} from './sekoliko.component';
import {MaterialModule} from '../../Utils/modules/Material.module';
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
import { NotFoundComponent } from './not-found/not-found.component';
import { PrincipalInterfaceComponent } from './principal-interface/principal-interface.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { FooterComponent } from './footer/footer.component';
import {TzDashboardComponent} from './tz-dashboard/tz-dashboard.component';
import {TzEtudiantsComponent} from './tz-etudiants/tz-etudiants.component';
import {TzSalleComponent} from './tz-salle/tz-salle.component';
import {TzPayementsComponent} from './tz-payements/tz-payements.component';
import {TzProfsComponent} from './tz-profs/tz-profs.component';

@NgModule({
  imports: [
    CommonModule,
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
    MatPaginatorModule,
    MatRadioModule,
    MatDatepickerModule,
    MatTableModule,
    MaterialModule
  ],
  declarations: [SekolikoComponent, TzDashboardComponent, TzEtudiantsComponent,
TzSalleComponent, FooterComponent, NotFoundComponent, TzProfsComponent, TzPayementsComponent, PrincipalInterfaceComponent, NavMenuComponent]
})
export class SekolikoModule { }
