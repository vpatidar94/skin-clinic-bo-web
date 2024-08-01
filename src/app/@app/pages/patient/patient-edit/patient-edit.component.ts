import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ApiResponse, DepartmentVo, ItemDetailDto, OrgCodeNoDto, ProductVo, UserBookingDto, UserBookingInvestigationDto, UserVo } from 'aayam-clinic-core';
import { Observable } from 'rxjs';
import { OrgApi } from 'src/app/@app/service/remote/org.api';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { PatientDetailEditComponent } from './patient-detail-edit/patient-detail-edit.component';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss']
})

export class PatientEditComponent implements OnInit, OnChanges {
  /* ************************************* Static Field ********************************************* */
  /* ************************************* Instance Field ******************************************** */
  showSectionPatient!: boolean;
  showSectionObservation!: boolean;
  showSectionService!: boolean;
  showSectionTest!: boolean;
  showSectionPrescription!: boolean;
  showSectionBilling!: boolean;

  tabValue!: string;

  @Input()
  userBooking!: UserBookingDto;
  @Output()
  userBookingChange = new EventEmitter<UserBookingDto>();

  @Input()
  serviceItemList!: ItemDetailDto[];

  @Input()
  docterList!: UserVo[];

  @Input()
  productList!: ProductVo[];

  @Input()
  departmentList!: DepartmentVo[];

  @Input()
  userBookingInvestigationList!: UserBookingInvestigationDto;

  @Input()
  subjectChangeTab!: Observable<string>;

  @Output() saveIt = new EventEmitter<void>();

  // for the patient-detail-edit form validation
  @Output() formValidityChange = new EventEmitter<boolean>();

  
  /* ************************************* Constructors ******************************************** */
  constructor(private orgApi: OrgApi,
    private keyValueStorageService: KeyValueStorageService
  ) { }

  /* ************************************* Public Methods ******************************************** */
  public ngOnInit(): void {
    this._init();
  }

  onPatientDetailEditFormValidityChange(isValid: boolean) {
    // console.log('Child received grandchild form validity:', isValid);
    this.formValidityChange.emit(isValid);
  }
  public tabChange(): void {
    this._tabChange(this.tabValue);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['docterList']) {
      this.docterList = changes['docterList'].currentValue as UserVo[];
    }
    if (changes['userBookingInvestigationList']) {
      this.userBookingInvestigationList = changes['userBookingInvestigationList'].currentValue as UserBookingInvestigationDto;
    }
  }


  onBillingEditSave() {
    this.saveIt.emit();
  }
  /* ************************************* Private Methods ******************************************** */
  private _init(): void {
    this.tabValue = 'PATIENT'
    this.tabChange();
    const orgId = this.keyValueStorageService.getOrgId();
    if (orgId) {
      this.orgApi.getLastOrderNo(orgId).subscribe((res: ApiResponse<OrgCodeNoDto>) => {
        if (res.body) {
          this.userBooking.booking.no = String(res.body.no + 1);
          this.userBooking.booking.patientNo = String(res.body.patientNo + 1);
          this.userBookingChange.emit(this.userBooking);
        }
      });
    }
    this._changeTabOnSave();
  }

  private _tabChange(tabValue: string): void {
    this.keyValueStorageService.savePatientBookingSection(tabValue);
    switch (tabValue) {
      case 'PATIENT':
        this._resetSection();
        this.showSectionPatient = true;
        break;
      case 'OBSERVATION':
        this._resetSection();
        this.showSectionObservation = true;
        break;
      case 'SERVICE':
        this._resetSection();
        this.showSectionService = true;
        break;
      case 'TEST':
        this._resetSection();
        this.showSectionTest = true;
        break;
      case 'PRESCRIPTION':
        this._resetSection();
        this.showSectionPrescription = true;
        break;
      case 'BILLING':
        this._resetSection();
        this.showSectionBilling = true;
        break;
    }
  }

  private _resetSection(): void {
    this.showSectionPatient = false;
    this.showSectionObservation = false;
    this.showSectionService = false;
    this.showSectionTest = false;
    this.showSectionPrescription = false;
    this.showSectionBilling = false;
  }

  private _changeTabOnSave(): void { 
    this.subjectChangeTab.subscribe((msg: string) => { 
      if (msg === 'CHANGE_TAB') { 
        const tab = this.keyValueStorageService.getPatientBookingSection();
        switch (tab) {
          case 'PATIENT':
            this.tabValue = 'SERVICE'
            this.tabChange();
            break;
          case 'OBSERVATION':
            this.tabValue = 'PRESCRIPTION'
            this.tabChange();
            break;
          case 'SERVICE':
            this.tabValue = 'BILLING'
            this.tabChange();
            break;
          case 'PRESCRIPTION':
            this.tabValue = 'TEST'
            this.tabChange();
            break;
          case 'BILLING':
            this.tabValue = 'OBSERVATION'
            this.tabChange();
        }
      }
    });
  }
}

