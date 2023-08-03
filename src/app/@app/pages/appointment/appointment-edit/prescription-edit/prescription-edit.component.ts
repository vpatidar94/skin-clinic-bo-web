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
 
  @Input()
  userBooking!: UserBookingDto;
  
  
  showSectionAdd = false;
 
  // newly added  for complaint section
  complaints: BookingVo["complaint"] = [" "]

  //newly added for diagnosis section
  
  diagnosis: BookingVo["diagnosis"]  = [" "];

  // newly added for Rx section
  rxPrescription: Array<PrescriptionVo>= [];


  /* ************************************ Constructors ************************************ */
  constructor() {
    this.addRxItem();
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


  public addNewService(): void {
    this.showSectionAdd = true;
    this.prescription.push({} as PrescriptionVo);

  }

  public addDiagnosisItem(): void {
    this.diagnosis.push("abc");
    console.log("xx xx xx", this.diagnosis.length, "ccc",this.diagnosis);
  }

  public removeDiagnosisItem(index: number): void {
    console.log("item has removed");
    this.diagnosis.splice(index, 1);
  }

  public addComplaintItem(): void {
    this.complaints.push(" ");
  }

  public removeComplaintItem(index: number): void {
    console.log("item has removed");
    this.complaints.splice(index, 1);
  }

  public addRxItem(): void {
    const rxItem = {} as PrescriptionVo;
    rxItem.dosage = "";
    rxItem.duration = 1;
    rxItem.instruction = "";
    rxItem.name = "";
    this.rxPrescription.push(rxItem);
  }

  public removeRxItem(index: number): void {
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
