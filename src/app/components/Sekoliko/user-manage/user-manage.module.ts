import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserManageRoutingModule} from './user-manage-routing.module';
import {UserManageComponent} from './user-manage.component';
import {UserListComponent} from './user-list/user-list.component';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule, MatDatepickerModule, MatExpansionModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule,
  MatListModule, MatMenuModule,
  MatPaginatorModule, MatRadioModule, MatSelectModule, MatSidenavModule,
  MatTableModule, MatToolbarModule
} from '@angular/material';
import {MatKeyboardModule} from '@ngx-material-keyboard/core';
import {MaterialModule} from '../../../Utils/modules/Material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DataTablesModule} from 'angular-datatables';
import {RadarSpinnerModule} from 'angular-epic-spinners';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
  imports: [
    CommonModule,
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
    MatKeyboardModule,
    UserManageRoutingModule
  ],
  declarations: [UserManageComponent, UserListComponent, EditUserComponent]
})
export class UserManageModule {
}
