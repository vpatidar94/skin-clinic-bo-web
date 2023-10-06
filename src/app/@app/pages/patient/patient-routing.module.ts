import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PatientComponent } from './patient.component';
import { ServiceItemComponent } from './service-item/service-item.component';

const routes = [
  { path: '', component: PatientComponent },
  { path: 'service-item', component: ServiceItemComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule {
}
