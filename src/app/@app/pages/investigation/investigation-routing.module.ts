import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InvestigationComponent } from './investigation.component';

const routes = [
    { path: '', component: InvestigationComponent },
    { path: 'investigation', component: InvestigationComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class InvestigationRoutingModule {

}