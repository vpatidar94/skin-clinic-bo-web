import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AddressVo, ApiResponse, BOOKING_TYPE, BOOKING_TYPE_NAME, BookingVo, ItemDetailDto, KeyValueVo, ObservationVo, OrgBookingCountDto, OrgBookingDto, PrescriptionVo, ResponseStatus, UserBookingDto, UserBookingInvestigationDto, UserVo } from 'aayam-clinic-core';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { SUB_ROLE } from '../../const/sub-role.const';
import { BookingApi } from '../../service/remote/booking.api';
import { ServiceItemApi } from '../../service/remote/service-item.api';
import { UserApi } from '../../service/remote/user.api';
//newly added to show table
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, map, of as observableOf, startWith, switchMap } from 'rxjs';

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

  resultsLength = 0;
  serviceItemList!: ItemDetailDto[];
  doctorList!: UserVo[];

  bookingList!: OrgBookingDto[];

  // newly added to show table
  displayedColumns: string[] = ['AppNo', 'Date', 'PatientName', 'Type', 'DoctorsName', "Time", "Action"];
  dataSource = new MatTableDataSource<OrgBookingDto>([] as OrgBookingDto[]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  bookingTypeName: any = BOOKING_TYPE_NAME;

  userBookingInvestigationList!: UserBookingInvestigationDto;



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
    booking.type = BOOKING_TYPE.PATIENT; // TODO change if appointment
    booking.observation = {} as ObservationVo;
    booking.observation.date = new Date();
    booking.observation.healthParams = [] as Array<KeyValueVo>
    booking.prescription = [] as PrescriptionVo[];
    booking.instruction = [] as string[];
    booking.test = [] as string[];
    booking.bookingDate = new Date();
    booking.complaint = [] as string[];
    booking.complaint.push("");
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
      if (res.status === ResponseStatus[ResponseStatus.SUCCESS] && res.body) {
        this.userBooking = res.body
      }
    });
  }

  public getBookingType(type: string): string { 
    if (!type) {
      return '';
    }
    return this.bookingTypeName[type] as string;
  }

  // newly added to show table
  public ngAfterViewInit() {
    const orgId = this.keyValueStorageService.getOrgId();
    if (!orgId) {
      return;
    }
    this.dataSource.paginator = this.paginator;

    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.bookingApi.getOrgBookingList(
            orgId,
            this.paginator.pageIndex + 1,
            this.paginator.pageSize
          ).pipe(catchError(() => observableOf()));
        }),
        map((res: ApiResponse<OrgBookingCountDto>) => {
          if (res.body) {
            this.resultsLength = res.body?.totalBooking;
            return res.body;
          }
          return {} as OrgBookingCountDto;
        })
      )
      .subscribe((dto) => {
        this.bookingList = dto?.orgBooking ?? [] as OrgBookingDto[];
        this.dataSource = new MatTableDataSource(this.bookingList);
      });

  }

  // newly added to show table
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getUserBooking(orgBooking: OrgBookingDto): void {
    console.log(orgBooking.booking.user);
    this.bookingApi.getBookingList(orgBooking.booking.user, orgBooking.booking.orgId).subscribe((res: ApiResponse<UserBookingInvestigationDto>) => {
      if (res.body) {
        this.userBookingInvestigationList = res.body as UserBookingInvestigationDto;
        this.addAppointment();
      }
    });
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


