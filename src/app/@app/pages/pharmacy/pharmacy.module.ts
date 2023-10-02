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
import { PharmacyRoutingModule } from './pharmacy-routing.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AddressModule } from 'src/app/@shared/component/address/address.module'
import { MatDialogModule } from '@angular/material/dialog';
import { DialogModule } from 'src/app/@shared/component/dialog/dialog.module';
import { LabelModule } from 'src/app/@shared/component/label/label.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { SharedDirectiveModule } from 'src/app/@shared/directive/shared-directive.module';
import { MatNativeDateModule } from '@angular/material/core';
import { PharmacyComponent } from './pharmacy.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PharmacyBillingComponent } from './pharmacy-billing/pharmacy-billing.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { BillingComponent } from './billing/billing.component';
import { ViewPatientComponent } from './view-patient/view-patient.component';
import { PharmacyEditComponent } from './pharmacy-billing/pharmacy-edit/pharmacy-edit.component';
import { PharmacyInventoryComponent } from './pharmacy-inventory/pharmacy-inventory.component';
import { NewPurchaseEditComponent } from './pharmacy-inventory/new-purchase-edit/new-purchase-edit.component';

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
  imports: [...COMMON_MODULE, ...MATERIAL_MODULE,SharedDirectiveModule, PharmacyRoutingModule, AddressModule, DialogModule, LabelModule, NgMultiSelectDropDownModule.forRoot()],
  providers: [],
  exports: [],
  declarations: [PharmacyComponent,PharmacyEditComponent, PatientListComponent, PharmacyBillingComponent, PrescriptionComponent, BillingComponent, ViewPatientComponent,PharmacyInventoryComponent,NewPurchaseEditComponent]
})
export class PharmacyModule { }
