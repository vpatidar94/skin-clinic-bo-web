import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminReportsComponent } from './admin-reports.component';
import { PatientReportEditComponent } from './patient-report-edit/patient-report-edit.component';
import { PharmacyReportEditComponent } from './pharmacy-report-edit/pharmacy-report-edit.component';
import { PathologyReportEditComponent } from './pathology-report-edit/pathology-report-edit.component';
import { UserReportEditComponent } from './user-report-edit/user-report-edit.component';
import { BillingReportEditComponent } from './billing-report-edit/billing-report-edit.component';
import { InventoryReportEditComponent } from './inventory-report-edit/inventory-report-edit.component';
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
    { path: 'user-report', component: UserReportEditComponent},
    { path: 'billing-report', component: BillingReportEditComponent},
    { path: 'inventory-report', component: InventoryReportEditComponent},


]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class AdminReportsRoutingModule {

  }