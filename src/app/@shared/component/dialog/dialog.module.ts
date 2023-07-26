import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog.component';
import { ConfirmProceedDialogComponent } from './confirm-proceed-dialog.component';

const MATERIAL_MODULE = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatIconModule,
  MatDialogModule
];

const COMPONENTS = [ConfirmDeleteDialogComponent, ConfirmProceedDialogComponent];

const COMMON_MODULE = [CommonModule, FormsModule];

@NgModule({
  imports: [...COMMON_MODULE, ...MATERIAL_MODULE],
  declarations: [...COMPONENTS]
})
export class DialogModule {
}
