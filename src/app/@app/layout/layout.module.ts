import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { SideMenuModule } from "../../@shared/component/side-menu/side-menu.module";
import { UserMenuModule } from "../../@shared/component/user-menu/user-menu.module";


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
    declarations: [...EG_COMPONENT],
    exports: [...EG_COMPONENT],
    imports: [...COMMON_MODULE, ...MATERIAL_MODULE, SideMenuModule, UserMenuModule,]
})
export class LayoutModule {
}
