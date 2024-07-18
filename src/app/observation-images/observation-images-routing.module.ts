import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ObservationImagesComponent } from './observation-images.component';


const routes = [
  { path: '', component: ObservationImagesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObservationImagesRoutingModule {
}
