import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserBookingDto } from 'aayam-clinic-core';
import { GENDER_NAME } from 'src/app/@app/const/gender.consr';

@Component({
  selector: 'app-prescription-print-dialog',
  templateUrl: './prescription-print-dialog.component.html',
  styleUrls: ['./prescription-print-dialog.component.scss']
})
export class PrescriptionPrintDialogComponent {
  /* ************************************ Static Fields ************************************ */
  /* ************************************ Instance Fields ************************************ */
  currentDate = new Date();
  doctorName = 'Dr. Ram';
  patientId = '1214';
  patientName = 'Mr Sheru';
  fatherName = 'Mr Singh';
  gender = 'Male';
  age = '24';
  // patientAddress= '';
  refferedBy = 'Dr. Dixit';
  paymentMode = '';
  paymentType = '';

  prescription = [
    { name: 'Aspirin', dosage: 'BD', duration: '5 days' },
    { name: 'Azee', dosage: 'BD', duration: '5 days' },
    { name: 'Colpol', dosage: 'OD', duration: '5 days' },
  ];

  genderName = GENDER_NAME as any;

  /* ************************************ Constructors ************************************ */
  constructor(public dialogRef: MatDialogRef<PrescriptionPrintDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserBookingDto) {
  }
 
  /* ************************************ Public Methods ************************************ */

  public print() {
    const printContents = document?.getElementById('receipt-print')?.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents ?? '';

    window.print();

    document.body.innerHTML = originalContents;
    this.dialogRef.close();
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }


}
