import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { ReceiptComponent } from './receipt.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@NgModule({
    imports: [CommonModule, RouterModule],
    providers: [ { provide: DEFAULT_CURRENCY_CODE, useValue: 'INR' }],
    exports: [],
    declarations: [ReceiptComponent]
  })
  export class ReceiptModule { }