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

import { InvestigationComponent } from './investigation.component';
import { InvestigationRoutingModule } from './investigation-routing.module';
import { ViewInvestigationComponent } from './view-investigation/view-investigation.component';
import { TestSampleDetailsComponent } from './test-sample-details/test-sample-details.component';
import { ReportsComponent } from './reports/reports.component';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { TestIdBarCodeDialogComponent } from './test-id-bar-code-dialog/test-id-bar-code-dialog.component';
import { PatientIdBarCodeDialogComponent } from './patient-id-bar-code-dialog/patient-id-bar-code-dialog.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';


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
    imports: [...COMMON_MODULE, ...MATERIAL_MODULE, SharedDirectiveModule, InvestigationRoutingModule, AddressModule, DialogModule, LabelModule, NgMultiSelectDropDownModule.forRoot(),NgxBarcode6Module,PdfViewerModule],
    providers: [],
    exports: [],
    declarations: [InvestigationComponent, ViewInvestigationComponent, TestSampleDetailsComponent, ReportsComponent,PatientIdBarCodeDialogComponent,TestIdBarCodeDialogComponent]
})
export class InvestigationModule { }
