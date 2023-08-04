import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MasterComponent } from './master.component';
import { ServicesComponent } from './services/services.component';
import { ServiceTypeComponent } from './service-type/service-type.component';


const routes = [
  { path: '', component: MasterComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'service-type', component: ServiceTypeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule {
}
