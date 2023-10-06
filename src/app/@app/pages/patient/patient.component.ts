import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AddressVo, ApiResponse, BOOKING_TYPE, BOOKING_TYPE_NAME, BookingVo, ItemDetailDto, KeyValueVo, ObservationVo, OrgBookingCountDto, OrgBookingDto, PrescriptionVo, ProductVo, ResponseStatus, UserBookingDto, UserBookingInvestigationDto, UserVo } from 'aayam-clinic-core';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { SUB_ROLE } from '../../const/sub-role.const';
import { BookingApi } from '../../service/remote/booking.api';
import { ServiceItemApi } from '../../service/remote/service-item.api';
import { UserApi } from '../../service/remote/user.api';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, map, of as observableOf, startWith, switchMap } from 'rxjs';
import { ProductApi } from '../../service/remote/product.api';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit, AfterViewInit {

  /* ************************************* Static Field ********************************************* */
  /* ************************************* Instance Field ******************************************** */
  showSectionAppointmentList!: boolean;
  showSectionAppointmentEdit!: boolean;

  userBooking!: UserBookingDto;

  orgBooking! : OrgBookingDto;

  resultsLength = 0;
  serviceItemList!: ItemDetailDto[];
  doctorList!: UserVo[];

  bookingList!: OrgBookingDto[];

  productList!: ProductVo[];

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
    private bookingApi: BookingApi,
    private productApi: ProductApi) { }

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
    this._addEditOrg(userBooking);
  }

  public cloneAppointment(orgBookingDto : OrgBookingDto): void {
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
    booking.complaint =  orgBookingDto.booking.complaint;
    booking.referedBy = orgBookingDto.booking.referedBy;
    booking.diagnosis = [] as string[];
    booking.drExt = orgBookingDto.booking.drExt;
    booking.dr = orgBookingDto.booking.dr;
    const orgId = this.keyValueStorageService.getOrgId();
    if (orgId) {
      booking.orgId = orgId;
      booking.brId = orgId;
    }
    userBooking.booking = booking;
    userBooking.user = orgBookingDto.patient;
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
            BOOKING_TYPE.PATIENT,
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

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public editDetails(orgBooking: OrgBookingDto): void {
    this.bookingApi.getBookingList(orgBooking.booking.user, orgBooking.booking.orgId).subscribe((res: ApiResponse<UserBookingInvestigationDto>) => {
      if (res.body) {
        this.userBookingInvestigationList = res.body as UserBookingInvestigationDto;
        const userBooking = {} as UserBookingDto;
        userBooking.booking = orgBooking.booking;
        userBooking.user = orgBooking.patient;
        this._addEditOrg(userBooking);
      }
    });
  }

  // newly added to show details ..right now it is showing the same details as booking
  public addNewBookingUser(orgBooking: OrgBookingDto): void {
    this.bookingApi.getBookingList(orgBooking.booking.user, orgBooking.booking.orgId).subscribe((res: ApiResponse<UserBookingInvestigationDto>) => {
      if (res.body) {
        this.userBookingInvestigationList = res.body as UserBookingInvestigationDto;
        this.cloneAppointment(orgBooking);
      }
    });
  }



  public _getProductList(): void {
    const orgId = this.keyValueStorageService.getOrgId();
    if (!orgId) {
        return;
    }
    this.productApi.getProductList(orgId).subscribe((res: ApiResponse<ProductVo[]>) => {
        this.productList = res.body ?? [] as ProductVo[];
        this.resultsLength = this.productList.length;
    })
}

  /* ************************************* Private Methods ******************************************** */
  private _init(): void {
    this._resetSection();
    this.showSectionAppointmentList = true;
    this._getServiceList();
    this._getDoctorList();
    this._getProductList();
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
}

