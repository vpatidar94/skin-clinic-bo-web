import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LatLngModule } from '../lat-lng/lat-lng.module';
import { EditAddressFormComponent } from './edit-address-form.component';
import { EditAddressComponent } from './edit-address.component';
import { ViewAddressComponent } from './view-address.component';
import { MatInputModule } from '@angular/material/input';
import { SharedDirectiveModule } from '../../directive/shared-directive.module';


const COMMON_MODULE = [CommonModule, FormsModule];

@NgModule({
  imports: [...COMMON_MODULE, LatLngModule, MatFormFieldModule, MatInputModule, SharedDirectiveModule],
  exports: [ViewAddressComponent, EditAddressComponent, EditAddressFormComponent], // declare view and edit comp as public
  declarations: [ViewAddressComponent, EditAddressComponent, EditAddressFormComponent]
})
export class AddressModule {
}
