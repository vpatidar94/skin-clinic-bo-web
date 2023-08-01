import { CommonModule } from '@angular/common';
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
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AddressModule } from 'src/app/@shared/component/address/address.module'
import { MatDialogModule } from '@angular/material/dialog';
import { DialogModule } from 'src/app/@shared/component/dialog/dialog.module';
import { LabelModule } from 'src/app/@shared/component/label/label.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UserProfileComponent } from './userprofile/userprofile.component';
import { AccountComponent } from './accounts/accounts.component';



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
  MatDialogModule
];

const COMMON_MODULE = [CommonModule, FormsModule];

@NgModule({
  imports: [...COMMON_MODULE, ...MATERIAL_MODULE, UsersRoutingModule, AddressModule, DialogModule, LabelModule, NgMultiSelectDropDownModule.forRoot()],
  providers: [],
  exports: [],
  declarations: [UsersComponent, UserProfileComponent, AccountComponent]
})
export class UsersModule { }
