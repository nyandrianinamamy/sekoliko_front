import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import {
  MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule,
  MatDatepickerModule, MatFormFieldModule,
  MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule,
  MatPaginatorModule,
  MatRadioModule, MatSelectModule, MatSidenavModule,
  MatTableModule, MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AdministrationComponent} from './administration.component';
import { ListAdministrationComponent } from './list-administration/list-administration.component';

@NgModule({
  imports: [
    CommonModule,
    AdministrationRoutingModule,
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
    MatTableModule
  ],
  declarations: [AdministrationComponent, ListAdministrationComponent]
})
export class AdministrationModule { }
