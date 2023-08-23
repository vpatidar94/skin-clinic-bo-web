import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { StaffComponent } from './staff/staff.component';
import { WattsappComponent } from './wattsapp/wattsapp.component';
import { NewWattsappComponent } from './new-wattsapp/new-wattsapp.component';

const routes = [
  { path: '', component: StaffComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'wattsapp', component: WattsappComponent },
  { path: 'new-wattsapp', component: NewWattsappComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule {
}
