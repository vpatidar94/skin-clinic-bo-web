import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminReportsComponent } from './admin-reports.component';
import { PatientReportEditComponent } from './patient-report-edit/patient-report-edit.component';
// import { PharmacyComponent } from './pharmacy.component';
// import { PatientListComponent } from './patient-list/patient-list.component';
// import { PharmacyBillingComponent } from './pharmacy-billing/pharmacy-billing.component';
// import { PrescriptionComponent } from './prescription/prescription.component';
// import { BillingComponent } from './billing/billing.component';
// import { ViewPatientComponent } from './view-patient/view-patient.component';
// import { PharmacyInventoryComponent } from './pharmacy-inventory/pharmacy-inventory.component';


const routes = [
    { path: '', component: AdminReportsComponent },
    {path:'patient-report' , component: PatientReportEditComponent},
    // {path:'pharmacy-billing' , component: PharmacyBillingComponent},
    // {path: 'view-patient' , component: ViewPatientComponent},
    // {path: 'pharmacy-inventory', component: PharmacyInventoryComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class AdminReportsRoutingModule {

  }