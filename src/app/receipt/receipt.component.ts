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
  patientId ='1214';
  patientName = 'Mr Sheru Verma';
  fatherName = 'Mr Singh';
  gender = '';
  age = '';
  patientAddress= '';
  paymentMode='';
  paymentType='';

  services = [
    { name: 'Consultation', price: 100},
    { name: 'X-Ray', price: 150 },
    { name: 'Blood Test', price: 75.50 },
    { name: 'PRP', price: 750 },
  ];

  calculateTotal(): number {
    return this.services.reduce((total, service) => total + service.price, 0);
  }
}
