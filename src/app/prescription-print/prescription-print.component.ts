import { Component } from '@angular/core';

@Component({
  selector: 'app-prescription-print',
  templateUrl: './prescription-print.component.html',
  styleUrls: ['./prescription-print.component.scss']
})
export class PrescriptionPrintComponent {
  currentDate = new Date();
  doctorName = 'Dr. Ram';
  patientId ='1214';
  patientName = 'Mr Sheru';
  fatherName = 'Mr Singh';
  gender = 'Male';
  age = '24';
  // patientAddress= '';
  refferedBy='Dr. Dixit';
  paymentMode='';
  paymentType='';

  prescription = [
    { name: 'Aspirin', dosage:'BD', duration:'5 days'},
    { name: 'Azee', dosage:'BD', duration:'5 days'},
    { name: 'Colpol', dosage:'OD', duration:'5 days'},
  ];

  
}
