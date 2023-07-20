import { Component, OnInit } from '@angular/core';
import { BookingVo, ObservationVo, PrescriptionVo, UserVo } from 'aayam-clinic-core';
import { AuthService } from 'src/app/@shared/security/auth.service';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { AuthApi } from '../../service/remote/auth.api';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  /* ************************************* Static Field ********************************************* */
  /* ************************************* Instance Field ******************************************** */
  showSectionAppointmentList!: boolean;
  showSectionAppointmentEdit!: boolean;

  booking!: BookingVo;

  /* ************************************* Constructors ******************************************** */
  constructor(private authApi: AuthApi,
    private keyValueStorageService: KeyValueStorageService,
    private authService: AuthService) { }

  /* ************************************* Public Methods ******************************************** */
  public ngOnInit(): void {
    this._init();
  }

  public addAppointment(): void {
    const booking = {} as BookingVo;
    booking.user = {} as UserVo;
    booking.dr = {} as UserVo;
    booking.observation = {} as ObservationVo;
    booking.prescription = [] as PrescriptionVo[];
    booking.instruction = [] as string[];
    booking.test = [] as string[];
    const orgId = this.keyValueStorageService.getOrgId();
    if (orgId) {
      booking.orgId = orgId;
      booking.brId = orgId;
    }
    this._addEditOrg(booking);
  }

  /* ************************************* Private Methods ******************************************** */
  private _init(): void {
    this._resetSection();
    this.showSectionAppointmentList = true;
  }

  private _resetSection(): void {
    this.showSectionAppointmentEdit = false;
    this.showSectionAppointmentList = false;
  }

  private _addEditOrg(booking: BookingVo): void {
    this.booking = booking;
    this._resetSection();
    this.showSectionAppointmentEdit = true;
  }
}

