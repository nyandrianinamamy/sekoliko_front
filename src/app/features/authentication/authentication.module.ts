import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './components';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationEffects } from './store/authentication.effects';
import { AuthenticationStore } from './store/authentication.store';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    EffectsModule.forFeature([AuthenticationEffects]),
    AuthenticationRoutingModule
  ],
  declarations: [AuthenticationComponent],
  exports: [],
  providers: [AuthenticationService, AuthenticationStore]
})
export class AuthenticationModule {}
