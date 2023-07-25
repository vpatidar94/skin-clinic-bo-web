import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookingVo, ItemDetailDto, ObservationVo, PrescriptionVo, UserBookingDto, UserVo } from 'aayam-clinic-core';
import { AuthService } from 'src/app/@shared/security/auth.service';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.scss']
})
export class AppointmentEditComponent implements OnInit {

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

  /* ************************************* Constructors ******************************************** */
  constructor(private keyValueStorageService: KeyValueStorageService) { }

  /* ************************************* Public Methods ******************************************** */
  public ngOnInit(): void {
    this._init();
  }

  public tabChange(): void {
    this._tabChange(this.tabValue);
  }

  /* ************************************* Private Methods ******************************************** */
  private _init(): void {
    this.tabValue = 'PATIENT'
    this.tabChange();
  }

  private _tabChange(tabValue: string): void {
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
}

