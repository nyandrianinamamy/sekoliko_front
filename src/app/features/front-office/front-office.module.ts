import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { FrontOfficeComponent } from './components';
import { FrontOfficeRoutingModule } from './front-office-routing.module';
import { FrontOfficeService } from './services/front-office.service';
import { FrontOfficeEffects } from './store/front-office.effects';
import { FrontOfficeStore } from './store/front-office.store';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    EffectsModule.forFeature([FrontOfficeEffects]),
    FrontOfficeRoutingModule
  ],
  declarations: [FrontOfficeComponent],
  exports: [],
  providers: [FrontOfficeService, FrontOfficeStore]
})
export class FrontOfficeModule {}
