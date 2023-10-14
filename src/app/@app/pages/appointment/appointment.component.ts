import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { ServiceItemApi } from '../../service/remote/service-item.api';
import { ApiResponse, BookingVo, ItemDetailDto, ObservationVo, ResponseStatus, UserBookingDto, UserVo, BOOKING_TYPE, BOOKING_TYPE_NAME, KeyValueVo, PrescriptionVo, AddressVo, OrgBookingDto, ProductVo, OrgBookingCountDto, UserBookingInvestigationDto, PATIENT_TYPE, } from 'aayam-clinic-core';
import { UserApi } from '../../service/remote/user.api';
import { SUB_ROLE } from '../../const/sub-role.const';
import { BookingApi } from '../../service/remote/booking.api';
import { catchError, map, of as observableOf, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})

export class AppointmentComponent implements OnInit, AfterViewInit {

  showSectionAppointmentList: boolean = false;
  showSectionAppointmentEdit: boolean = false;


  userBooking!: UserBookingDto;

  orgBooking!: OrgBookingDto;

  resultsLength = 0;
  serviceItemList!: ItemDetailDto[];
  doctorList!: UserVo[];

  bookingList!: OrgBookingDto[];

  productList!: ProductVo[];
  userBookingInvestigationList!: UserBookingInvestigationDto;

  displayedColumns: string[] = ['appNo', 'name', 'date', "time", "doctor", "consultationFor", "action"];;
  dataSource = new MatTableDataSource<OrgBookingDto>([] as OrgBookingDto[]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  bookingTypeName: any = BOOKING_TYPE_NAME;

  columnFilters: { [key: string]: string } = {};

  originalDataSource: OrgBookingDto[] = [];
  filteredData: OrgBookingDto[] = [];
  /* ************************************ Constructors ************************************ */
  constructor(private keyValueStorageService: KeyValueStorageService,
    private serviceItemApi: ServiceItemApi,
    private userApi: UserApi,
    private bookingApi: BookingApi,
  ) {
  }

  /* ************************************ Public Methods ************************************ */
  public ngOnInit(): void {
    this._init();
  }

  public applyFilter(columnName: string, event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.columnFilters[columnName] = filterValue;
    // Combine all column filters
    const combinedFilters = Object.values(this.columnFilters).filter((filter) => !!filter);
    // If there are no filters, show all data
    if (combinedFilters.length === 0) {
      this.dataSource.data = this.originalDataSource;
      this.filteredData = []; // Reset filtered data array
      return;
    }
    // Filter the data progressively from the original data or the previously filtered data
    let dataToFilter: OrgBookingDto[];
    if (this.filteredData.length > 0) {
      dataToFilter = [...this.filteredData];
    } else {
      dataToFilter = [...this.originalDataSource];
    }
    for (const filter of combinedFilters) {
      dataToFilter = dataToFilter.filter((data) => {
        const cellValue = this.getCellValue(data, columnName);

        if (cellValue !== undefined && cellValue.includes(filter)) {
          return true; // Include the row if the cell value matches the filter
        }

        return false; // Exclude the row if no match is found or cellValue is undefined
      });
    }
    // Update the data source with the filtered data
    this.dataSource.data = dataToFilter;
    this.filteredData = dataToFilter;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public addAppointment() {
    const userBooking = {} as UserBookingDto;
    const booking = {} as BookingVo;
    booking.type = BOOKING_TYPE.APPOINTMENT; // TODO change if appointment
    booking.observation = {} as ObservationVo;
    booking.observation.date = new Date();
    booking.observation.healthParams = [] as Array<KeyValueVo>;
    booking.prescription = [] as PrescriptionVo[];
    booking.instruction = [] as string[];
    booking.test = [] as string[];
    booking.bookingDate = new Date();
    booking.complaint = [] as string[];
    booking.complaint.push("");
    booking.diagnosis = [] as string[];
    booking.drExt = [] as string[];
    booking.drExt.push("");
    const orgId = this.keyValueStorageService.getOrgId();
    if (orgId) {
      booking.orgId = orgId;
      booking.brId = orgId;
    }
    userBooking.booking = booking;
    userBooking.user = {} as UserVo;
    userBooking.user.address = {} as AddressVo;
    this._addEditAppointment(userBooking);
  }

  public saveBooking(): void {
    this.bookingApi.addUpdateBooking(this.userBooking).subscribe((res: ApiResponse<UserBookingDto>) => {
      if (res.status === ResponseStatus[ResponseStatus.SUCCESS] && res.body) {
        this.userBooking = res.body
      }
    });
  }

  public cancel(): void {
    this._init();
  }

  public getBookingType(type: string): string {
    if (!type) {
      return '';
    }
    return this.bookingTypeName[type] as string;
  }

  public ngAfterViewInit() {
    this._initView();
  }

  public addAsPatient(dto: OrgBookingDto): void {
    // TODO: If required select patient type from dialof open and then call this api with select patient type
    this.bookingApi.convertToPatient(dto.booking._id, PATIENT_TYPE.OPD, dto.booking.orgId).subscribe((res: ApiResponse<null>) => {
      if (res.status == ResponseStatus[ResponseStatus.SUCCESS]) {
        this._initView();
      }
    });
  }

  /* ************************************ Private Methods ************************************ */
  private _init(): void {
    this._resetSection();
    this.showSectionAppointmentList = true;
    this._getServiceList();
    this._getDoctorList();

  }

  private _initView(): void {
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
            BOOKING_TYPE.APPOINTMENT,
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
        this.originalDataSource = [...this.bookingList];
      });
  }

  private _resetSection(): void {
    this.showSectionAppointmentList = false;
    this.showSectionAppointmentEdit = false;
  }

  private _addEditAppointment(userBooking: UserBookingDto): void {
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
      if (res.body && res.body?.length > 0) {
        this.serviceItemList = res.body;
      }
    });
  }

  private _getDoctorList(): void {
    const orgId = this.keyValueStorageService.getOrgId();
    if (!orgId) {
      return;
    }
    this.userApi.getDoctorList(orgId, SUB_ROLE.DOCTOR).subscribe((res: ApiResponse<UserVo[]>) => {
      if (res.body && res.body?.length > 0) {
        this.doctorList = res.body;
      }
    }
    );
  }

  private getCellValue(data: OrgBookingDto, columnName: any): any | undefined {

    if (columnName === 'appNo' && data.booking?.no) {
      return data.booking?.no.toLowerCase();
    } else if (columnName === 'name' && data.patient.nameF) {
      return data.patient.nameF.toLowerCase();
    }
    else if (columnName === 'date' && data.booking.bookingDate) {
      return data.booking.bookingDate.toString();
    }

    else if (columnName === 'time' && data.booking.shift) {
      return data.booking.shift.toLowerCase();
    }

    else if (columnName === 'doctor' && data.drDetail.nameF) {
      return data.drDetail.nameF.toLowerCase();
    }

    else if (columnName === 'consultationFor' && data.booking.type) {
      return data.booking.type.toLowerCase();
    }
    return undefined;

  }
}

