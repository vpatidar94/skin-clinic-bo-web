import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InventoryComponent } from './inventory.component';

const routes = [
    { path: '', component: InventoryComponent },
    { path: 'inventory', component: InventoryComponent },
    // { path: 'view-investigation', component: ViewInvestigationComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class InventoryRoutingModule {

}