import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MasterComponent } from './master.component';
import { ServicesComponent } from './services/services.component';
import { ServiceTypeComponent } from './service-type/service-type.component';
import { AddServiceTypeComponent } from './add-service-type/add-service-type.componrnt';
import { AddServiceComponent } from './add-service/add-service.component';
import { ProductsComponent } from './products/products.component';
import { AddUserTypeComponent } from './add-user-type/add-user-type.component';
import { DepartmentComponent } from './department/department.component';


const routes = [
  { path: '', component: MasterComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'service-type', component: ServiceTypeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'add-service-type', component: AddServiceTypeComponent },
  { path: 'add-service', component: AddServiceComponent },
  { path: 'add-department', component: DepartmentComponent },
  { path: 'add-user-type', component: AddUserTypeComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule {
}
