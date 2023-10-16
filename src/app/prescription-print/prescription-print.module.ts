import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PrescriptionPrintComponent } from './prescription-print.component';
import { MatIconModule } from '@angular/material/icon';


const COMMON_MODULE = [CommonModule, RouterModule];
@NgModule({
    imports: [...COMMON_MODULE, MatIconModule ],
    providers: [],
    exports: [],
    declarations: [PrescriptionPrintComponent]
  })
  export class PrescriptionPrintModule { }