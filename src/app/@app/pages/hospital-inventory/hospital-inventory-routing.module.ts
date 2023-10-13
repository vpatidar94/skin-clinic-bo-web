import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HospitalInventoryComponent } from './hospital-inventory.component';

const routes = [
    { path: '', component: HospitalInventoryComponent },
    { path: 'inventory', component: HospitalInventoryComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class InventoryRoutingModule {

}