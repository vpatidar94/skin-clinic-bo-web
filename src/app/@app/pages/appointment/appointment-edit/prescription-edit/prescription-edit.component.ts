import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PrescriptionVo, BookingVo, UserBookingDto } from 'aayam-clinic-core';
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
  userBooking!: UserBookingDto;

  @Output()
  userBookingChange = new EventEmitter<UserBookingDto>();

  @Output()
  pubSub = new EventEmitter<any>();

  @ViewChild('prescriptionForm', { static: true })
  prescriptionForm!: NgForm;

  showSectionAdd = false;


  /* ************************************ Constructors ************************************ */
  constructor() {
    // this.addRxItem();
    // console.log("xxcc",this.diagnosis)
  }

  /* ************************************ Public Methods ************************************ */
  public ngOnInit(): void {
    // console.log(this.userBooking['booking']);
    this._init();
    // @ts-ignore
    this.prescriptionForm?.valueChanges?.subscribe(() => {
      this._formChanged();
    });
  }


  // public trackByIndex(index: number, obj: any): any {
  //     return index;
  // }


  public addNewPrescription(): void {
    this.showSectionAdd = true;
    this.userBooking.booking.prescription = [] as PrescriptionVo[];
    const prescriptionItem = {} as PrescriptionVo;
    prescriptionItem.name = "";
    prescriptionItem.dosage = "";
    prescriptionItem.duration = 1;
    prescriptionItem.instruction = "";
    this.userBooking.booking.prescription.push(prescriptionItem);
    // console.log("kkk",this.userBooking.booking.prescription)
    this.userBooking.booking.complaint = [" "];
    this.userBooking.booking.diagnosis = [" "];
    // console.log("//////",this.userBooking);
    this.userBookingChange.emit(this.userBooking);
  }


  public addDiagnosisItem(): void {
    this.userBooking.booking.diagnosis.push(" ");
    // console.log("userBooking.booking.diagnosis", this.userBooking.booking.diagnosis.length, "nn",this.userBooking.booking.diagnosis)
  }

  public removeDiagnosisItem(index: number): void {
    // console.log("item has removed");
    this.userBooking.booking.diagnosis.splice(index, 1);
  }

  public addComplaintItem(): void {
    this.userBooking.booking.complaint.push(" ");
  }


  public removeComplaintItem(index: number): void {
    // console.log("item has removed");
    this.userBooking.booking.complaint.splice(index, 1);
  }

  public addRxItem(): void {
    const prescriptionItem = {} as PrescriptionVo;
    prescriptionItem.dosage = "";
    prescriptionItem.duration = 1;
    prescriptionItem.instruction = "";
    prescriptionItem.name = "";
    this.userBooking.booking.prescription.push(prescriptionItem);
    this.userBookingChange.emit(this.userBooking);
  }

  public removeRxItem(index: number): void {
    this.userBooking.booking.prescription.splice(index, 1)
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
