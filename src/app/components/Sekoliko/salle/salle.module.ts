import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalleRoutingModule } from './salle-routing.module';
import {SalleComponent} from './salle.component';
import { ListSalleComponent } from './list-salle/list-salle.component';
import {
  MatButtonModule,
  MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatDatepickerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatPaginatorModule,
  MatRadioModule, MatSelectModule, MatSidenavModule,
  MatTableModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {MaterialModule} from '../../../Utils/modules/Material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    SalleRoutingModule,
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
    MatTooltipModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatInputModule,
    MatPaginatorModule,
    MatRadioModule,
    MatDatepickerModule,
    MatTableModule,
    MaterialModule
  ],
  declarations: [SalleComponent, ListSalleComponent]
})
export class SalleModule { }
