import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components';
import { SharedModule } from './modules/shared/shared.module';
import { AppEffects } from './store/app.effects';
import { metaReducers, reducers } from './store/app.reducer';
import { AppStore } from './store/app.store';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([AppEffects]),
    SharedModule
  ],
  providers: [AppStore],
  bootstrap: [AppComponent]
})
export class AppModule {}
