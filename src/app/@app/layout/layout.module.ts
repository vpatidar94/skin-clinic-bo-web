import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';


const COMMON_MODULE = [CommonModule, RouterModule];
const MATERIAL_MODULE = [
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule, 
];
const EG_COMPONENT = [LayoutComponent];

@NgModule({
  imports: [...COMMON_MODULE, ...MATERIAL_MODULE],
  declarations: [...EG_COMPONENT],
  exports: [...EG_COMPONENT]
})
export class LayoutModule {
}
