import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTableModule } from "@angular/material/table";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PdfViewerModule } from 'ng2-pdf-viewer'; // <- import PdfViewerModule
import { AddressModule } from 'src/app/@shared/component/address/address.module';
import { BillingComponent } from 'src/app/@shared/component/billing/billing.component';
import { DialogModule } from 'src/app/@shared/component/dialog/dialog.module';
import { LabelModule } from 'src/app/@shared/component/label/label.module';
import { SharedDirectiveModule } from 'src/app/@shared/directive/shared-directive.module';
import { PatientEditComponent } from './patient-edit/patient-edit.component';
import { PatientServiceEditComponent } from './patient-edit/patient-service-edit/patient-service-edit.component';
import { PatientTestEditComponent } from './patient-edit/patient-test-edit/patient-test-edit.component';
import { PatientObservationEditComponent } from './patient-edit/patient-observation-edit/patient-observation-edit.component';
import { PatientDetailEditComponent } from './patient-edit/patient-detail-edit/patient-detail-edit.component';
import { PatientPrescriptionEditComponent } from './patient-edit/patient-prescription-edit/patient-prescription-edit.component';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { PatientBillingEditComponent } from './patient-edit/patient-billing-edit/patient-billing-edit.component';
import { ServiceItemEditComponent } from './service-item/service-item-edit/service-item-edit.component';
import { ServiceItemComponent } from './service-item/service-item.component';
import { MatSortModule } from '@angular/material/sort';
import { PdfViewerDialogComponent } from './patient-edit/patient-billing-edit/pdf-viewer-dialog.component';

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
  MatSortModule,
];

const COMMON_MODULE = [CommonModule, FormsModule];

@NgModule({
  imports: [...COMMON_MODULE, ...MATERIAL_MODULE, PatientRoutingModule, AddressModule, DialogModule, LabelModule, NgMultiSelectDropDownModule.forRoot(), SharedDirectiveModule, PdfViewerModule],
  providers: [],
  exports: [],
  declarations: [PatientComponent, PatientEditComponent, PatientDetailEditComponent, ServiceItemEditComponent, ServiceItemComponent, PatientObservationEditComponent, PatientTestEditComponent, PatientServiceEditComponent, PatientPrescriptionEditComponent, BillingComponent, PatientBillingEditComponent, PdfViewerDialogComponent],
})
export class PatientModule { }

