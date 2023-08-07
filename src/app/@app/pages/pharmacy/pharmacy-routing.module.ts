import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PharmacyComponent } from './pharmacy.component';
import { PatientListComponent } from './patient-list/patient-list.component';


const routes = [
    { path: '', component: PharmacyComponent },
    {path:'patient-list' , component: PatientListComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class PharmacyRoutingModule {

  }