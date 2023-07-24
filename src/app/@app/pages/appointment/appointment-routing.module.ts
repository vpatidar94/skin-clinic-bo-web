import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppointmentComponent } from './appointment.component';
import { ServiceItemComponent } from './service-item/service-item.component';

const routes = [
  { path: '', component: AppointmentComponent },
  { path: 'service-item', component: ServiceItemComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule {
}
