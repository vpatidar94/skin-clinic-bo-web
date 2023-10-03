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
import { AppointmentEditComponent } from './appointment-edit/appointment-edit.component';
import { AppointmentServiceEditComponent } from './appointment-edit/appointment-service-edit/appointment-service-edit.component';
import { AppointmentTestEditComponent } from './appointment-edit/appointment-test-edit/appointment-test-edit.component';
import { ObservationEditComponent } from './appointment-edit/observation-edit/observation-edit.component';
import { PatientEditComponent } from './appointment-edit/patient-edit/patient-edit.component';
import { PrescriptionEditComponent } from './appointment-edit/prescription-edit/prescription-edit.component';
import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentComponent } from './appointment.component';
import { BillingEditComponent } from './billing-edit/billing-edit.component';
import { ServiceItemEditComponent } from './service-item/service-item-edit/service-item-edit.component';
import { ServiceItemComponent } from './service-item/service-item.component';

import { MatSortModule } from '@angular/material/sort';
import { PdfViewerDialogComponent } from './billing-edit/pdf-viewer-dialog.component';

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
  imports: [...COMMON_MODULE, ...MATERIAL_MODULE, AppointmentRoutingModule, AddressModule, DialogModule, LabelModule, NgMultiSelectDropDownModule.forRoot(), SharedDirectiveModule, PdfViewerModule],
  providers: [],
  exports: [],
  declarations: [AppointmentComponent, AppointmentEditComponent, PatientEditComponent, ServiceItemEditComponent, ServiceItemComponent, ObservationEditComponent, AppointmentTestEditComponent, AppointmentServiceEditComponent, PrescriptionEditComponent, BillingComponent, BillingEditComponent, PdfViewerDialogComponent],
})
export class AppointmentModule { }
