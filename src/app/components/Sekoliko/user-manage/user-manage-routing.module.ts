import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserManageModule} from './user-manage.module';
import {UserListComponent} from './user-list/user-list.component';
import {EditUserComponent} from './edit-user/edit-user.component';

const routes: Routes = [
  {
    path: '',
    component: UserManageModule,
    children: [
      {path: '', redirectTo: 'list'},
      {path: 'list', component: UserListComponent},
      {path: 'edit', component: EditUserComponent},
      {path: 'edit/:id', component: EditUserComponent},
      {path: 'edit/:id/:type', component: EditUserComponent},
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManageRoutingModule { }
