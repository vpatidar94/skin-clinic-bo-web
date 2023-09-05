import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewAppointmentComponent } from './new-appointment.component';
import { AppointmentComponent } from '../appointment/appointment.component';



const routes = [
    { path: '', component: NewAppointmentComponent },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class NewAppointmentRoutingModule {
  }
  