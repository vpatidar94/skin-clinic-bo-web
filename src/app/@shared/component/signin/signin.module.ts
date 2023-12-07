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
import { SigninComponent } from './signin.component';
import { RemoteApiModule } from 'src/app/@app/service/remote/remote.api.module';
import { ForgotPasswordDialogComponent } from './forgot-password-dialog/forgot-password-dialog.component';
import { DialogModule } from '@angular/cdk/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { VerifyOtpDialogComponent } from './verify-otp-dialog/verify-otp-dialog.component';
import { SharedDirectiveModule } from '../../directive/shared-directive.module';


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
  MatDialogModule
];

const COMMON_MODULE = [CommonModule, FormsModule];

@NgModule({
  imports: [...COMMON_MODULE, ...MATERIAL_MODULE, RemoteApiModule, DialogModule, SharedDirectiveModule],
  providers: [],
  exports: [],
  declarations: [SigninComponent, ForgotPasswordDialogComponent, VerifyOtpDialogComponent]
})
export class SigninModule { }
