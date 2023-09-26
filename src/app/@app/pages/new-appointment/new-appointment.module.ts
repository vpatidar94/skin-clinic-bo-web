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
import { NewAppointmentComponent } from './new-appointment.component';
import { NewAppointmentRoutingModule } from './new-appointment-routing.module';
import { LabelModule } from 'src/app/@shared/component/label/label.module';
import { NewAppointmentEditComponent } from './new-appointment-edit/new-appointment-edit.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

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
  ];

  const COMMON_MODULE = [CommonModule, FormsModule];

  @NgModule({
    imports: [...COMMON_MODULE, ...MATERIAL_MODULE, NewAppointmentRoutingModule, NgMultiSelectDropDownModule.forRoot(), LabelModule],
    providers: [],
    exports: [],
    declarations: [NewAppointmentComponent,NewAppointmentEditComponent]
  })

export class NewAppointmentModule { }