import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';

import {MatChipsModule} from '@angular/material/chips';
import { SideMenuComponent } from './side-menu.component';


const COMMON_MODULE = [CommonModule];
const MATERIAL_MODULE = [MatChipsModule, MatIconModule, MatListModule];

@NgModule({
  imports: [...COMMON_MODULE, RouterModule, ...MATERIAL_MODULE],
  declarations: [SideMenuComponent],
  exports: [SideMenuComponent]
})

export class SideMenuModule {
}
