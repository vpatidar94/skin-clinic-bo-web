import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddPatientComponent } from 'src/app/addpatient/addpatient.component';

const routes = [
  { path: '', component: AddPatientComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
