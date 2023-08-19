import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PharmacyReceiptComponent } from './pharmacy-receipt.component';
import { MatIconModule } from '@angular/material/icon';


const COMMON_MODULE = [CommonModule, RouterModule];
@NgModule({
    imports: [...COMMON_MODULE, MatIconModule ],
    providers: [],
    exports: [],
    declarations: [PharmacyReceiptComponent]
  })
  export class PharmacyReceiptModule { }