import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { SharedService } from './services/shared.service';
import { SharedEffects } from './store/shared.effects';
import { SharedStore } from './store/shared.store';

@NgModule({
  imports: [CommonModule, RouterModule, EffectsModule.forFeature([SharedEffects])],
  providers: [SharedService, SharedStore]
})
export class SharedModule {}
