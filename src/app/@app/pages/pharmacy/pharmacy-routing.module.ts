import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PharmacyComponent } from './pharmacy.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PharmacyBillingComponent } from './pharmacy-billing/pharmacy-billing.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { BillingComponent } from './billing/billing.component';


const routes = [
    { path: '', component: PharmacyComponent },
    {path:'patient-list' , component: PatientListComponent},
    {path:'pharmacy-billing' , component: PharmacyBillingComponent},
    {path: 'prescription' , component: PrescriptionComponent},
    {path: 'billing' , component: BillingComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class PharmacyRoutingModule {

  }