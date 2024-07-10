import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PrescriptionVo, UserBookingDto, UserBookingInvestigationDto, ProductVo, DOSAGE_LIST, UserVo } from 'aayam-clinic-core';
import { UiActionDto } from 'src/app/@shared/dto/ui-action.dto';
import { PrescriptionPrintDialogComponent } from './prescription-print/prescription-print-dialog.component';
import { APP_CONST } from 'src/app/@app/const/app.const';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AddOtherProductDialogComponent } from './add-other-product-dialog/add-other-product-dialog.component';

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

  nextVisitDays: number = 0; // Default value
  nextVisitDate!: Date; // Default value
  minNextVisitDate!: Date; // Minimum date

  @Input()
  userBookingInvestigationList!: UserBookingInvestigationDto;

  @Input()
  productList!: ProductVo[];

  dosageList = DOSAGE_LIST;

  @Input()
  doctorList!: UserVo[];

  // Other: string = "OTHER";
  Other = APP_CONST.OTHER;
  showMedicineInput: boolean = false;


  filteredProducts!: Observable<{ name: string }[]>;


  // newly added 
  selectedMedicine: { [key: number]: any } = {};
  genderSelectList: Array<any> = [];
  selectedGender: string = "";
  dropdownSettings = {
    singleSelection: true,
    textField: 'item_text',
    idField: 'item_id',
    itemsShowLimit: 8,
    allowSearchFilter: true,
    enableCheckAll: false,
    maxHeight: 100,
    minWidth: 350
  };
  /* ************************************ Constructors ************************************ */
  constructor(private dialog: MatDialog) {
    console.log("prod", this.productList)
  }

  /* ************************************ Public Methods ************************************ */
  public ngOnInit(): void {
    console.log("doctor is", this.doctorList);
    this._init();

    this.addOtherOption();
    // @ts-ignore
    this.prescriptionForm?.valueChanges?.subscribe(() => {
      this._formChanged();
    });
    this.showSectionAdd = this.userBooking.booking?.prescription?.length > 0;


    if (this.userBooking.booking.nextVisitDate) {
      this.updateNextVisitDays();
    }

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
      const nextDate = new Date(today.getTime() + this.nextVisitDays * 24 * 60 * 60 * 1000);

      this.minNextVisitDate = nextDate;

      // Update the date in the userBooking object if needed
      this.userBooking.booking.nextVisitDate = this.minNextVisitDate;
      this.updateNextVisitDays();
    }

  }

  private updateNextVisitDays() {
    const today = new Date();
    const nextVisitDate = new Date(this.userBooking.booking.nextVisitDate);
    const timeDiff = nextVisitDate.getTime() - today.getTime();
    this.nextVisitDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
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


      data: { userBooking: { ...this.userBooking }, doctorList: this.doctorList, productList: this.productList },
    });
  }

  public trackByFn(index: number) {
    return index;
  }

  public prescriptionChange(event: any, index: number): void {
    const productId = this.userBooking.booking.prescription[index]?.productId;

    if (productId === 'OTHER') {
      this.dialog.open(AddOtherProductDialogComponent, {
        width: '1200px',
        height: '550px',

      });
    } else {
      // Find the product by its ID
      const product = this.productList.find(it => it._id === productId);
      if (product && product._id) {
        this.userBooking.booking.prescription[index].name = product.name;
      }
    }
    // console.log(event);
  }

  public getDoctorById(Id: string | null | undefined): string | null | undefined {
    const doctorId = Id;
    const doctor = this.doctorList?.find(doc => doc._id === doctorId);
    return doctor ? doctor.nameF + " " + doctor.nameL : "";
  }


  /* ************************************ Private Methods ************************************ */
  private _init(): void {
    console.log("nextVisit", this.nextVisitDays)
    if (this.userBooking.booking.nextVisitDate) {
      this.isNextVisitChecked = true;

    }
    else {
      this.userBooking.booking.nextVisitDate = this.nextVisitDate;
    }
    this.genderSelectList = this.productList?.map((item: any) => {
      const selected = { item_id: item.id, item_text: item.name };
      return selected;
    });
  }

  private _formChanged(): void {
    const actionDto = {
      action: 'CHANGE_FORM_PRESCRIPTION',
      data: this.prescriptionForm.invalid
    } as UiActionDto<boolean>;
    this.pubSub.emit(actionDto);
  }

  public onGenderSelect(item: any, index: number): void {
    this.selectedMedicine[index] = item.item_text;
    this.userBooking.booking.prescription[index].name = item.item_text;
    this.userBooking.booking.prescription[index].productId = item.item_id;

  }

  private addOtherOption(): void {
    const otherOption: Partial<ProductVo> = { _id: 'OTHER', name: 'OTHER' } as ProductVo;
    this.productList = [otherOption as ProductVo, ...this.productList];

    this.genderSelectList = this.productList.map(item => {
      return { item_id: item._id, item_text: item.name };
    });

  }
}
