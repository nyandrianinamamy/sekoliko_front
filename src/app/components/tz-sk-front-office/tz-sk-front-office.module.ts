import {NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {HttpClientModule} from '@angular/common/http';

import {TzSkFrontOfficeRoutingModule} from './tz-sk-front-office-routing.module';
import {TzSkFrontOfficeComponent} from "./tz-sk-front-office.component";
import {SkNavbarComponent} from "./sk-navbar/sk-navbar.component";

@NgModule({
    imports: [
        CommonModule,
        TzSkFrontOfficeRoutingModule,
        MDBBootstrapModule.forRoot(),
    ], schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        TzSkFrontOfficeComponent,
        SkNavbarComponent
    ]
})
export class TzSkFrontOfficeModule {
}
