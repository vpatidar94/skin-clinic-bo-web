import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {LatLngComponent} from './lat-lng.component';
import { NgxGpAutocompleteModule } from '@angular-magic/ngx-gp-autocomplete';

const COMMON_MODULE = [CommonModule, FormsModule];

@NgModule({
  imports: [...COMMON_MODULE, NgxGpAutocompleteModule, NgxGpAutocompleteModule.forRoot({
    loaderOptions: {
      apiKey: 'AIzaSyDE6fD-uTkdkQA4zzamabzqQMGEZn9eaDA',
      libraries: ['places']
    }
  }),
],
  exports: [LatLngComponent], // declare view and edit comp as public
  declarations: [LatLngComponent]
})
export class LatLngModule {
}
