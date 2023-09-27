import { Component } from '@angular/core';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent {
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

  calculateTotal(): number {
    return this.services.reduce((total, service) => total + ((service.price) * (service.qty)), 0);
  }
}
