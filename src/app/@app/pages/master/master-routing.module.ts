import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MasterComponent } from './master.component';
import { ServicesComponent } from './services/services.component';
import { ServiceTypeComponent } from './service-type/service-type.component';
import { AddServiceTypeComponent } from './add-service-type/add-service-type.componrnt';
import { AddServiceComponent } from './add-service/add-service.component';
import { ProductsComponent } from './products/products.component';
import { DepartmentComponent } from './department/department.component';
import { UserTypeComponent } from './user-type/user-type.component';


const routes = [
  { path: '', component: MasterComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'service-type', component: ServiceTypeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'add-service-type', component: AddServiceTypeComponent },
  { path: 'add-service', component: AddServiceComponent },
  { path: 'department', component: DepartmentComponent },
  { path: 'user-type', component: UserTypeComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule {
}
