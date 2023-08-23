import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
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
import { StaffComponent } from './staff/staff.component';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { CustomerComponent } from './customer/customer.component';
import { StaffEditComponent } from './staff/staff-edit/staff-edit.component';
import { AddressModule } from "../../../@shared/component/address/address.module";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { WattsappComponent } from './wattsapp/wattsapp.component';
import { HttpClientModule } from '@angular/common/http';
import { NewWattsappComponent } from './new-wattsapp/new-wattsapp.component';


const MATERIAL_MODULE = [
  MatButtonModule,
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
  MatListModule
];

const COMMON_MODULE = [CommonModule, FormsModule];
const MY_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY'
  }
};

@NgModule({
  providers: [
    DatePipe,
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
  exports: [],
  declarations: [StaffComponent, CustomerComponent, StaffEditComponent, WattsappComponent,NewWattsappComponent],
  imports: [...COMMON_MODULE, ...MATERIAL_MODULE, UserManagementRoutingModule, AddressModule, HttpClientModule,],

})
export class UserManagementModule { }
