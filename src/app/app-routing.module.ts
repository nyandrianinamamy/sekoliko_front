import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authentication',
    loadChildren: './features/authentication/authentication.module#AuthenticationModule'
  },
  {
    path: 'front-office',
    loadChildren: './features/front-office/front-office.module#FrontOfficeModule'
  },
  {
    path: 'login',
    redirectTo: 'authentication',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'authentication'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
