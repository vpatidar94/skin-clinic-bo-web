import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AddressVo, ApiResponse, BOOKING_TYPE, BookingVo, ItemDetailDto, KeyValueVo, ObservationVo, OrgBookingDto, PrescriptionVo, ResponseStatus, UserBookingDto, UserVo } from 'aayam-clinic-core';
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
        map((res: ApiResponse<OrgBookingDto[]>) => {
          this.resultsLength = 4;
          return res.body;
        })
      )
      .subscribe((empData) => {
        this.bookingList = empData ?? [] as OrgBookingDto[];
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

  public getBookingList(pageNumber: number, maxRecord: number) {
    const orgId = this.keyValueStorageService.getOrgId();
    if (!orgId) {
      return;
    }
    this.bookingApi.getOrgBookingList(orgId, pageNumber, maxRecord).subscribe((res: ApiResponse<OrgBookingDto[]>) => {
      this.bookingList = res.body ?? [] as OrgBookingDto[];
      this.resultsLength = this.bookingList.length;
      this._initBookingTable(this.bookingList);
    })
  }

  // onPageChange(event: PageEvent) {
  //   this.getBookingList(event.pageIndex + 1, event.pageSize);
  // }


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

  private _initBookingTable(bookingList: Array<OrgBookingDto>): void {
    // this.dataSource = new MatTableDataSource(bookingList);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
}


