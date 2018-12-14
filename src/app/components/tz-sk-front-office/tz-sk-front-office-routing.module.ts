import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TzSkFrontOfficeComponent} from "./tz-sk-front-office.component";

const routes: Routes = [
    {
        path: '', component: TzSkFrontOfficeComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TzSkFrontOfficeRoutingModule {}
