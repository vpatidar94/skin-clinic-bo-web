import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AddressVo, ApiResponse, BookingVo, ItemDetailDto, KeyValueVo, ObservationVo, PrescriptionVo, ResponseStatus, UserBookingDto, UserVo } from 'aayam-clinic-core';
import { AuthService } from 'src/app/@shared/security/auth.service';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { AuthApi } from '../../service/remote/auth.api';
import { ServiceItemApi } from '../../service/remote/service-item.api';
import { UserApi } from '../../service/remote/user.api';
import { SUB_ROLE } from '../../const/sub-role.const';
import { BookingApi } from '../../service/remote/booking.api';
//newly added to show table
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
// newly added to show table
export interface PeriodicElement {
  AppNo: number;
  Date: string;
  PatientName: string;
  Type: string;
  DoctorsName: string;
  Time: string;
  Action: string;
}

// newly added to show table
const ELEMENT_DATA: PeriodicElement[] = [
  { AppNo: 1, Date: '01-08-2023', PatientName: 'Mayank Patidar', Type: 'OPD', DoctorsName: 'Dr.Mayank Patidar', Time: '11:20', Action: "View Details | Delete | Booking" },
  { AppNo: 2, Date: '01-08-2023', PatientName: 'Mayank Patidar', Type: 'OPD', DoctorsName: 'Dr.Mayank Patidar', Time: '11:20', Action: "View Details | Delete | Booking" },
  { AppNo: 3, Date: '01-08-2023', PatientName: 'Mayank Patidar', Type: 'OPD', DoctorsName: 'Dr.Mayank Patidar', Time: '11:20', Action: "View Details | Delete | Booking" },
  { AppNo: 4, Date: '01-08-2023', PatientName: 'Mayank Patidar', Type: 'OPD', DoctorsName: 'Dr.Mayank Patidar', Time: '11:20', Action: "View Details | Delete | Booking" },
]

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit, AfterViewInit {

  /* ************************************* Static Field ********************************************* */
  /* ************************************* Instance Field ******************************************** */
  showSectionAppointmentList!: boolean;
  showSectionAppointmentEdit!: boolean;

  userBooking!: UserBookingDto;

  serviceItemList!: ItemDetailDto[];
  doctorList!: UserVo[];

  // newly added to show table
  displayedColumns: string[] = ['AppNo', 'Date', 'PatientName', 'Type', 'DoctorsName', "Time", "Action"];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  /* ************************************* Constructors ******************************************** */
  constructor(private userApi: UserApi,
    private keyValueStorageService: KeyValueStorageService,
    private serviceItemApi: ServiceItemApi,
    private bookingApi: BookingApi) { }

  /* ************************************* Public Methods ******************************************** */
  public ngOnInit(): void {
    this._init();
  }

  public addAppointment(): void {
    const userBooking = {} as UserBookingDto;
    const booking = {} as BookingVo;
    booking.observation = {} as ObservationVo;
    booking.observation.date = new Date();
    booking.observation.healthParams = [] as Array<KeyValueVo>
    booking.prescription = [] as PrescriptionVo[];
    booking.instruction = [] as string[];
    booking.test = [] as string[];
    booking.bookingDate = new Date();
    booking.complaint = [] as string[];
    booking.diagnosis = [] as string[];
    const orgId = this.keyValueStorageService.getOrgId();
    if (orgId) {
      booking.orgId = orgId;
      booking.brId = orgId;
    }
    userBooking.booking = booking;
    userBooking.user = {} as UserVo;
    userBooking.user.address = {} as AddressVo;
    this._addEditOrg(userBooking);
  }

  public cancel(): void {
    this._init();
  }

  public saveBooking(): void {
    this.bookingApi.addUpdateBooking(this.userBooking).subscribe((res: ApiResponse<UserBookingDto>) => {
      console.log(this.userBooking);
    });
  }

  // newly added to show table
  public ngAfterViewInit() {
    this.paginator.showFirstLastButtons  = false;
    this.paginator.hidePageSize = false;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
// newly added to show table
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /* ************************************* Private Methods ******************************************** */
  private _init(): void {
    this._resetSection();
    this.showSectionAppointmentList = true;
    this._getServiceList();
    this._getDoctorList();
  }

  private _resetSection(): void {
    this.showSectionAppointmentEdit = false;
    this.showSectionAppointmentList = false;
  }

  private _addEditOrg(userBooking: UserBookingDto): void {
    this.userBooking = userBooking;
    this._resetSection();
    this.showSectionAppointmentEdit = true;
  }

  private _getServiceList(): void {
    const orgId = this.keyValueStorageService.getOrgId();
    if (!orgId) {
      return;
    }
    this.serviceItemApi.getServiceItemList(orgId).subscribe((res: ApiResponse<ItemDetailDto[]>) => {
      if (res.status === ResponseStatus[ResponseStatus.SUCCESS]) {
        if (res.body && res.body?.length > 0) {
          this.serviceItemList = res.body;
          console.log("xxxservices", this.serviceItemList);
        }
      }
    });
  }

  private _getDoctorList(): void {
    const orgId = this.keyValueStorageService.getOrgId();
    if (!orgId) {
      return;
    }
    this.userApi.getDoctorList(orgId, SUB_ROLE.DOCTOR).subscribe((res: ApiResponse<UserVo[]>) => {
      if (res.status === ResponseStatus[ResponseStatus.SUCCESS]) {
        if (res.body && res.body?.length > 0) {
          this.doctorList = res.body;
        }
      }
    }
    );
  }
}


