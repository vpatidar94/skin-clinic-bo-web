import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AlertMessageWebComponent} from './alert-message-web.component';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';

const COMMON_MODULE = [CommonModule];
const MATERIAL_MODULE = [MatCardModule, MatIconModule, MatSnackBarModule];
const EG_COMPONENT = [AlertMessageWebComponent];

@NgModule({
  imports: [...COMMON_MODULE, ...MATERIAL_MODULE],
  declarations: [...EG_COMPONENT],
  exports: [...EG_COMPONENT]
})
export class AlertMessageModule {
}
