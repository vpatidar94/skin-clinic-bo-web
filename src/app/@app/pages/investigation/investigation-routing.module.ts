import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InvestigationComponent } from './investigation.component';
import { ViewInvestigationComponent } from './view-investigation/view-investigation.component';

const routes = [
    { path: '', component: InvestigationComponent },
    { path: 'investigation', component: InvestigationComponent },
    { path: 'view-investigation', component: ViewInvestigationComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class InvestigationRoutingModule {

}