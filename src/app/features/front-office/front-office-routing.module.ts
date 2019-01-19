import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FrontOfficeComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: FrontOfficeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontOfficeRoutingModule {}
