import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';

import {UserMenuComponent} from './user-menu.component';


const COMMON_MODULE = [CommonModule];
const MATERIAL_MODULE = [MatButtonModule, MatIconModule, MatListModule, MatMenuModule];
const EG_COMPONENT = [UserMenuComponent];

@NgModule({
  imports: [...COMMON_MODULE, ...MATERIAL_MODULE],
  declarations: [...EG_COMPONENT],
  exports: [...EG_COMPONENT]
})
export class UserMenuModule {
}
