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
import { SupportRoutingModule } from './support-routing.module';
import { OrgComponent } from './org/org.component';
import { OrgNetworkComponent } from './org-network/org-network.component';
import { OrgEditComponent } from './org/org-edit/org-edit.component';
import { AddressModule } from "../../../@shared/component/address/address.module";
import { SharedDirectiveModule } from 'src/app/@shared/directive/shared-directive.module';


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
  MatPaginatorModule
];

const COMMON_MODULE = [CommonModule, FormsModule];

@NgModule({
    providers: [],
    exports: [],
    declarations: [OrgComponent, OrgNetworkComponent, OrgEditComponent],
  imports: [...COMMON_MODULE, ...MATERIAL_MODULE, SupportRoutingModule, AddressModule, SharedDirectiveModule]
})
export class SupportModule { }
