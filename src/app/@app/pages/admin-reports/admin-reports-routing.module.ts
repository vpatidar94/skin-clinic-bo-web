import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminReportsComponent } from './admin-reports.component';
import { PatientReportEditComponent } from './patient-report-edit/patient-report-edit.component';
import { PharmacyReportEditComponent } from './pharmacy-report-edit/pharmacy-report-edit.component';
import { PathologyReportEditComponent } from './pathology-report-edit/pathology-report-edit.component';
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
    {path:'pharmacy-report' , component: PharmacyReportEditComponent},
    { path: 'pathology-report', component: PathologyReportEditComponent},
    //     { label: 'Pathology Report', link: '/admin-report/pathology-report' },
    //     { label: 'User Report', link: '/admin-report/user-report' },
    //     { label: 'Billing Report', link: '/admin-report/billing-report' },
    //     { label: 'Inventory Report', link: '/admin-report/inventory-report' },

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class AdminReportsRoutingModule {

  }