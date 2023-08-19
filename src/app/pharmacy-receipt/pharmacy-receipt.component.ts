import { Component } from '@angular/core';

@Component({
  selector: 'app-pharmacy-receipt',
  templateUrl: './pharmacy-receipt.component.html',
  styleUrls: ['./pharmacy-receipt.component.scss']
})
export class PharmacyReceiptComponent {
  currentDate = new Date();
  doctorName = 'Dr. John Snow';
  patientId ='1214';
  patientName = 'Mr Sheru';
  fatherName = 'Mr Singh';
  gender = '';
  age = '';
  patientAddress= '';
  paymentMode='';
  paymentType='';

  prescription = [
    { name: 'Aspirin', dosage:'BD', duration:'5 days'},
    { name: 'Azee', dosage:'BD', duration:'5 days'},
    { name: 'Colpol', dosage:'OD', duration:'5 days'},
  ];

  
}
