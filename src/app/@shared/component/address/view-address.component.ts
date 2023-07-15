import {Component, Input} from '@angular/core';
import { AddressVo } from 'aayam-clinic-core';

@Component({
  selector: 'app-prk-view-address',
  templateUrl: './view-address.component.html',
  styleUrls: ['view-address.component.css']
})
export class ViewAddressComponent {

  @Input()
  address!: AddressVo;

  constructor() {
  }

}
