import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PharmacyBillingComponent } from './pharmacy-billing/pharmacy-billing.component';
import { PharmacyInventoryComponent } from './pharmacy-inventory/pharmacy-inventory.component';
import { PharmacyComponent } from './pharmacy.component';
import { ViewPatientComponent } from './view-patient/view-patient.component';

const routes = [
    { path: 'patient-list', component: PatientListComponent },
    { path: 'pharmacy-billing', component: PharmacyBillingComponent },
    { path: 'view-patient', component: ViewPatientComponent },
    { path: 'pharmacy-inventory', component: PharmacyInventoryComponent },
    { path: '', component: PharmacyComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PharmacyRoutingModule {

}