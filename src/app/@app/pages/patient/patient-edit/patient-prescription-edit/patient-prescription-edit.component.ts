import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PrescriptionVo, UserBookingDto, UserBookingInvestigationDto, ProductVo } from 'aayam-clinic-core';
import { UiActionDto } from 'src/app/@shared/dto/ui-action.dto';
import { PrescriptionPrintDialogComponent } from './prescription-print/prescription-print-dialog.component';

@Component({
  selector: 'app-patient-prescription-edit',
  templateUrl: './patient-prescription-edit.component.html',
  styleUrls: ['./patient-prescription-edit.component.scss']
})
export class PatientPrescriptionEditComponent implements OnInit, OnChanges {
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
  isNextVisitChecked: boolean = false;

  // nextVisitDays: number = 0; // Default value
  // nextVisitDate: string = ''; // Default value
  // minNextVisitDate: string = ''; // Minimum date

  nextVisitDays: number = 0; // Default value
  nextVisitDate!: Date; // Default value
  minNextVisitDate!: Date; // Minimum date

  @Input()
  userBookingInvestigationList!: UserBookingInvestigationDto;

  @Input()
  productList!: ProductVo[];

  /* ************************************ Constructors ************************************ */
  constructor(private dialog: MatDialog) {
  }

  /* ************************************ Public Methods ************************************ */
  public ngOnInit(): void {
    this._init();
    // @ts-ignore
    this.prescriptionForm?.valueChanges?.subscribe(() => {
      this._formChanged();
    });
    this.showSectionAdd = this.userBooking.booking?.prescription?.length > 0;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['userBookingInvestigationList']) {
      this.userBookingInvestigationList = changes['userBookingInvestigationList'].currentValue as UserBookingInvestigationDto;
    }
  }

  public addNewPrescription(): void {
    this.showSectionAdd = true;
    this.userBooking.booking.prescription = [] as PrescriptionVo[];
    const prescriptionItem = {} as PrescriptionVo;
    this.userBooking.booking.prescription.push(prescriptionItem);
    this.userBookingChange.emit(this.userBooking);
    this.userBooking.booking.diagnosis = [""];
    this.userBookingChange.emit(this.userBooking);
  }

  public addDiagnosisItem(): void {
    this.userBooking.booking.diagnosis.push(" ");
  }

  public removeDiagnosisItem(index: number): void {
    this.userBooking.booking.diagnosis.splice(index, 1);
  }

  public addComplaintItem(): void {
    this.userBooking.booking.complaint.push("");
  }

  public removeComplaintItem(index: number): void {
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

  public updateMinNextVisitDate() {
    if (this.nextVisitDays >= 0) {
      const today = new Date();
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + this.nextVisitDays);
      // this.minNextVisitDate = nextDate.toISOString().split('T')[0];
      // this.nextVisitDate = this.minNextVisitDate; // Update the date input
      this.minNextVisitDate = nextDate;
      this.nextVisitDate = this.minNextVisitDate; // Update the date input
      this.userBooking.booking.nextVisitDate = this.nextVisitDate;
    }
  }

  // Watch for changes in nextVisitDays
  public onDaysChange() {
    if (this.nextVisitDays >= 0) {
      this.updateMinNextVisitDate();
    }
  }

  public printPrescription(): void {
    this.dialog.open(PrescriptionPrintDialogComponent, {
      height: '1500px',
      

      data: { ...this.userBooking },
    });
  }

  /* ************************************ Private Methods ************************************ */
  private _init(): void {
    if(this.userBooking.booking.nextVisitDate){
      this.isNextVisitChecked=true;
      
    }
    else{
    this.userBooking.booking.nextVisitDate = this.nextVisitDate;
    }
  }

  private _formChanged(): void {
    const actionDto = {
      action: 'CHANGE_FORM_PRESCRIPTION',
      data: this.prescriptionForm.invalid
    } as UiActionDto<boolean>;
    this.pubSub.emit(actionDto);
  }
}
