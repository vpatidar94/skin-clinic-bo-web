import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { StaffComponent } from './staff/staff.component';

const routes = [
  { path: '', component: StaffComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'customer', component: CustomerComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule {
}
