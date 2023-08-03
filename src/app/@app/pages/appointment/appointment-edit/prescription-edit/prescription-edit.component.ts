import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PrescriptionVo, BookingVo,UserBookingDto } from 'aayam-clinic-core';
import { UiActionDto } from 'src/app/@shared/dto/ui-action.dto';

@Component({
  selector: 'app-prescription-edit',
  templateUrl: './prescription-edit.component.html',
  styleUrls: ['./prescription-edit.component.scss']
})
export class PrescriptionEditComponent implements OnInit {
  /* ********************************* Static Field *************************************** */
  /* *********************************** Instance Field *********************************** */

  @Input()
  prescription!: Array<PrescriptionVo>;
  @Output()
  prescriptionChange = new EventEmitter<Array<PrescriptionVo>>();

  @Output()
  pubSub = new EventEmitter<any>();

  @ViewChild('prescriptionForm', { static: true })
  prescriptionForm!: NgForm;
 
  // newly added 
  // @Input()
  // userbooking!: BookingVo;
  @Input()
  userBooking!: UserBookingDto;
  
  
  showSectionAdd = false;

  // newly added  for complaint section
  // complaintsCount = 1;
  // complaints: any[] = [{ count: 1 }];
  complaints: BookingVo["complaint"] = [" "]

  //newly added for diagnosis section
  
  diagnosis: BookingVo["diagnosis"]  = [" "];

  // newly added for Rx section
  RxCount = 1;
  Rx: any[] = [{ count: 1 }];

  rxPrescription!: Array<PrescriptionVo>;


  /* ************************************ Constructors ************************************ */
  constructor() {
    // console.log("xxcc",this.diagnosis)
  }

  /* ************************************ Public Methods ************************************ */
  public ngOnInit(): void {
    this._init();
    // @ts-ignore
    this.prescriptionForm?.valueChanges?.subscribe(() => {
      this._formChanged();
    });
  }

  public addPrescription(): void {
    this.prescription.push({} as PrescriptionVo);
  }

  public removePrescription(index: number): void {
    this.prescription.splice(index, 1);
  }

  // public trackByIndex(index: number, obj: any): any {
  //     return index;
  // }



  // newly added for compllaints section
  // addComplaints() {
  //   this.complaintsCount++;
  //   this.complaints.push({ count: this.complaintsCount });
  // }

  // removeComplaints() {
  //   if (this.complaints.length > 1) {
  //     this.complaints.pop();
  //   }
  // }

  // newly added for diagnosis section
  // addDiagnosis() {
  //   this.diagnosisCount++;
  //   this.diagnosis.push({ count: this.diagnosisCount });
  // }

  // removeDiagnosis() {
  //   if (this.diagnosis.length > 1) {
  //     this.diagnosis.pop();
  //   }
  // }

  //newly added for Rx section
  addRx() {
    this.RxCount++;
    this.Rx.push({ count: this.RxCount });
  }

  removeRx() {
    if (this.Rx.length > 1) {
      this.Rx.pop();
    }
  }


  public addNewService(): void {
    this.showSectionAdd = true;
    // this.userBooking.booking.items = [] as OrderItemVo[];
    // const orderItem = {} as OrderItemVo;
    // orderItem.amount = 0;
    // orderItem.item = {} as ItemVo;
    // this.userBooking.booking.items.push(orderItem);
    // this.userBookingChange.emit(this.userBooking);
    this.prescription.push({} as PrescriptionVo);

  }

  public addDiagnosisItem(): void {
    // const orderItem = {} as OrderItemVo;
    // orderItem.item = {} as ItemVo;
    // orderItem.amount = 0;
    // this.userBooking.booking.items.push(orderItem);
    // this.userBookingChange.emit(this.userBooking);



    // this.userBooking.booking.diagnosis = [];

    // this.userBooking?.booking?.diagnosis.push(diagnosisItem);
    this.diagnosis.push("abc");
    console.log("xx xx xx", this.diagnosis.length, "ccc",this.diagnosis);


  }

  public removeDiagnosisItem(index: number): void {
    // this.userBooking.booking.items.splice(index, 1);
    // BookingUtility.applyDiscountAndCalPrice(this.userBooking.booking);
    // this.userBookingChange.emit(this.userBooking);
    // console.log(this.userBooking);
    console.log("item has removed");
    // this.userBooking?.booking?.diagnosis.splice(index,1);
    this.diagnosis.splice(index, 1);
  }

  public addComplaintItem(): void {
    // const orderItem = {} as OrderItemVo;
    // orderItem.item = {} as ItemVo;
    // orderItem.amount = 0;
    // this.userBooking.booking.items.push(orderItem);
    // this.userBookingChange.emit(this.userBooking);

    
    this.complaints.push(" ");
    console.log("xx xx xx", this.complaints.length);


  }

  public removeComplaintItem(index: number): void {
    // this.userBooking.booking.items.splice(index, 1);
    // BookingUtility.applyDiscountAndCalPrice(this.userBooking.booking);
    // this.userBookingChange.emit(this.userBooking);
    // console.log(this.userBooking);
    console.log("item has removed");
    this.complaints.splice(index, 1);
  }

  public addRxItem(): void {
    // const orderItem = {} as OrderItemVo;
    // orderItem.item = {} as ItemVo;
    // orderItem.amount = 0;
    // this.userBooking.booking.items.push(orderItem);
    // this.userBookingChange.emit(this.userBooking);
    const rxItem = {} as PrescriptionVo;
    rxItem.dosage = "";
    rxItem.duration = 1;
    rxItem.instruction = "";
    rxItem.name = "";


    // const rxItem = "";
    this.Rx.push("");
    // console.log("xx xx xx",this.complaints.length);


  }

  public removeRxItem(index: number): void {
    // this.userBooking.booking.items.splice(index, 1);
    // BookingUtility.applyDiscountAndCalPrice(this.userBooking.booking);
    // this.userBookingChange.emit(this.userBooking);
    // console.log(this.userBooking);
    // console.log("item has removed");
    this.rxPrescription.splice(index, 1);
  }



  /* ************************************ Private Methods ************************************ */
  private _init(): void {
  }

  private _formChanged(): void {
    const actionDto = {
      action: 'CHANGE_FORM_PRESCRIPTION',
      data: this.prescriptionForm.invalid
    } as UiActionDto<boolean>;
    this.pubSub.emit(actionDto);
  }
}
