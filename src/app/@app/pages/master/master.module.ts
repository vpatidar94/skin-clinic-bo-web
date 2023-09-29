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
import { MasterRoutingModule } from './master-routing.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AddressModule } from 'src/app/@shared/component/address/address.module'
import { MatDialogModule } from '@angular/material/dialog';
import { DialogModule } from 'src/app/@shared/component/dialog/dialog.module';
import { LabelModule } from 'src/app/@shared/component/label/label.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { SharedDirectiveModule } from 'src/app/@shared/directive/shared-directive.module';
import { MatNativeDateModule } from '@angular/material/core';
import { ServicesComponent } from './services/services.component';
import { MasterComponent } from './master.component';
import { ServiceTypeComponent } from './service-type/service-type.component';
import { AddServiceTypeComponent } from './add-service-type/add-service-type.componrnt';
import { AddServiceComponent } from './add-service/add-service.component';
import { ProductsComponent } from './products/products.component';
import { UserTypeComponent } from './user-type/user-type.component';
import { DepartmentComponent } from './department/department.component';
import { DepartmentEditComponent } from './department/department-edit/department-edit.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ServicesEditComponent } from './services/services-edit/services-edit.component';
import { ServiceTypeEditComponent } from './service-type/service-type-edit/service-type-edit.component';
import { UserTypeEditComponent } from './user-type/user-type-edit/user-type-edit.component';
import { InvestigationComponent } from './investigation/investigation.component';
import { InvestigationEditComponent } from './investigation/investigation-edit/investigation-edit.component';




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
  imports: [...COMMON_MODULE, ...MATERIAL_MODULE,SharedDirectiveModule, MasterRoutingModule, AddressModule, DialogModule, LabelModule, NgMultiSelectDropDownModule.forRoot()],
  providers: [],
  exports: [],
  declarations: [MasterComponent, ServicesComponent,ServicesEditComponent, ServiceTypeComponent,ServiceTypeEditComponent, ProductsComponent, ProductEditComponent, AddServiceTypeComponent, AddServiceComponent, DepartmentComponent,DepartmentEditComponent, UserTypeComponent,UserTypeEditComponent,InvestigationComponent,InvestigationEditComponent]
})
export class MasterModule { }
