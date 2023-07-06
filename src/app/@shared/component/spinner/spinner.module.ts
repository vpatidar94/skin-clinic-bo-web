import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {SpinnerComponent} from './spinner.component';
import {SpinnerService} from './spinner.service';

const COMMON_MODULE = [CommonModule];
const MATERIAL_MODULE = [MatProgressSpinnerModule, MatIconModule];
const EG_COMPONENT = [SpinnerComponent];

@NgModule({
  imports: [...COMMON_MODULE, ...MATERIAL_MODULE],
  declarations: [...EG_COMPONENT],
  exports: [...EG_COMPONENT],
  providers: [SpinnerService]
})
export class SpinnerModule {
}
