import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatCard, MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTableModule } from "@angular/material/table";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AddressModule } from 'src/app/@shared/component/address/address.module'
import { MatDialogModule } from '@angular/material/dialog';
import { DialogModule } from 'src/app/@shared/component/dialog/dialog.module';
import { LabelModule } from 'src/app/@shared/component/label/label.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { SharedDirectiveModule } from 'src/app/@shared/directive/shared-directive.module';
import { MatNativeDateModule } from '@angular/material/core';
import { AdminReportsRoutingModule } from './admin-reports-routing.module';
import { AdminReportsComponent } from './admin-reports.component';
import { PatientReportEditComponent } from './patient-report-edit/patient-report-edit.component';
import { PharmacyReportEditComponent } from './pharmacy-report-edit/pharmacy-report-edit.component';
import { PathologyReportEditComponent } from './pathology-report-edit/pathology-report-edit.component';
import { UserReportEditComponent } from './user-report-edit/user-report-edit.component';
import { BillingReportEditComponent} from './billing-report-edit/billing-report-edit.component';
import { InventoryReportEditComponent } from './inventory-report-edit/inventory-report-edit.component';
import { InventoryDialogDateComponent } from './inventory-report-edit/inventory-dialog-date.component';
import { BillingDialogDateComponent } from './billing-report-edit/billing-dialog-date.component';
import { PathologyDialogDateComponent } from './pathology-report-edit/pathology-dialog-date.component';
import { PatientDialogDateComponent } from './patient-report-edit/patient-dialog-date.component';
import { PharmacyDialogDateComponent } from './pharmacy-report-edit/pharmacy-dialog-date.component';
import { UserDialogDateComponent } from './user-report-edit/user-dialog-date.component';

const MATERIAL_MODULE = [
  MatButtonModule,
  MatButtonToggleModule,
  MatFormFieldModule,
  MatIconModule,
  MatTableModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatSlideToggleModule,
  MatCardModule,
  MatDatepickerModule,
  MatPaginatorModule,
  MatDialogModule,
  MatNativeDateModule,
  MatCardModule,
  
];

const COMMON_MODULE = [CommonModule, FormsModule];

@NgModule({
  imports: [...COMMON_MODULE, ...MATERIAL_MODULE,SharedDirectiveModule, AdminReportsRoutingModule, AddressModule, DialogModule, LabelModule, NgMultiSelectDropDownModule.forRoot(), MatCardModule, MatDatepickerModule, MatNativeDateModule],
  providers: [],
  exports: [],
  declarations: [AdminReportsComponent,PatientReportEditComponent,PharmacyReportEditComponent,PathologyReportEditComponent,UserReportEditComponent,BillingReportEditComponent,InventoryReportEditComponent,InventoryDialogDateComponent,BillingDialogDateComponent,PathologyDialogDateComponent,PatientDialogDateComponent,PharmacyDialogDateComponent,UserDialogDateComponent]
})
export class AdminReportsModule { }
