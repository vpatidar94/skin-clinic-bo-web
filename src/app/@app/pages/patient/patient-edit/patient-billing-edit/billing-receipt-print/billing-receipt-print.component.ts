import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserBookingDto } from 'aayam-clinic-core';

@Component({
  selector: 'app-billing-receipt-print',
  templateUrl: './billing-receipt-print.component.html',
  styleUrls: ['./billing-receipt-print.component.scss']
})
export class BillingReceiptPrintComponent {
  currentDate = new Date();
  receiptNo = '001223'
  doctorName = 'Dr. John Snow';
  patientId = '1214';
  visitId = '0125'
  patientName = 'Mr Sheru Verma';
  fatherName = 'Mr Singh';
  gender = 'Male';
  age = '29';
  patientAddress = '';
  paymentMode = 'Cash';
  paymentStatus = "Paid";

  services = [
    { name: 'Consultation', price: 100, qty: 1 },
    { name: 'X-Ray', price: 150, qty: 1 },
    { name: 'Blood Test', price: 75, qty: 1 },
    { name: 'PRP', price: 750, qty: 1 },
  ];



  /* ************************************ Constructors ************************************ */
  constructor(public dialogRef: MatDialogRef<BillingReceiptPrintComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {userBooking:UserBookingDto, doctorList: any}) {
  }
  calculateTotal(): number {
    return this.services.reduce((total, service) => total + ((service.price) * (service.qty)), 0);
  }
}
