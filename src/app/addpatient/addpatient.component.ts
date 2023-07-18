import {Component} from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTableModule } from "@angular/material/table";
import { MatCardContent } from '@angular/material/card';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import {MatTab, MatTabsModule} from '@angular/material/tabs';




/** @title Form field with error messages */
@Component({
  selector: 'app-addpatient',
  templateUrl: 'addpatient.component.html',
  styleUrls: ['addpatient.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, NgIf, MatButtonModule, MatButtonModule, MatCardModule, MatInputModule, MatTableModule,MatTabsModule],
})
export class AddPatientComponent {
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}