import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListEtudiantsComponent } from './list-etudiants/list-etudiants.component';
import {TzEtudiantsRoutingModule} from './tz-etudiants-routing.module';
import {TzEtudiantsComponent} from './tz-etudiants.component';

@NgModule({
    imports: [
        CommonModule,
        TzEtudiantsRoutingModule
    ],
    declarations: [TzEtudiantsComponent, ListEtudiantsComponent]
})
export class TzEtudiantsModule { }
