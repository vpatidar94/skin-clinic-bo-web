import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductVo, UserBookingDto } from 'aayam-clinic-core';
import { GENDER_NAME } from 'src/app/@app/const/gender.consr';
import { NgxPrintService, PrintOptions } from 'ngx-print';

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
    @Inject(MAT_DIALOG_DATA) public data: {userBooking:UserBookingDto, doctorList: any, productList: any},
    private printService: NgxPrintService) {
  }
 
  /* ************************************ Public Methods ************************************ */

  

  public print() {
    const customPrintOptions: PrintOptions = new PrintOptions({
      printSectionId: 'receipt-print',
      openNewTab: false,
      useExistingCss: true,
      closeWindow: true,
    });
    this.printService.print(customPrintOptions);
    this.dialogRef.close();
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }


  public getDoctorById(Id: string|null |undefined ): string|null |undefined {
    const doctorId = Id;
    const doctor = this.data.doctorList?.find((doc:any) => doc._id === doctorId);
    return doctor ? doctor.nameF + " " + doctor.nameL : "";
  }


  public getProductTypeByProductName(productName:any): string {
    const product = productName.name;
    const productType = this.data.productList?.find((prod:any) => prod.name === productName);
    return productType ? productType.productType : '';
  } 
}
