import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AddressVo, ApiResponse, BOOKING_TYPE, BOOKING_TYPE_NAME, BookingVo, DEPT, DEPT_LIST, DepartmentVo, ItemDetailDto, KeyValueVo, MessageType, ObservationVo, OrgBookingCountDto, OrgBookingDto, PrescriptionVo, ProductVo, ResponseStatus, UserBookingDto, UserBookingInvestigationDto, UserVo } from 'aayam-clinic-core';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { SUB_ROLE } from '../../const/sub-role.const';
import { BookingApi } from '../../service/remote/booking.api';
import { ServiceItemApi } from '../../service/remote/service-item.api';
import { UserApi } from '../../service/remote/user.api';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, catchError, map, of as observableOf, startWith, switchMap } from 'rxjs';
import { ProductApi } from '../../service/remote/product.api';
import { DepartmentApi } from '../../service/remote/department.api';
import { AlertMessage } from 'src/app/@shared/dto/alert-message';
import { GlobalEmitterService } from 'src/app/@shared/service/global-emitter.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from 'src/app/@shared/component/dialog/confirm-delete-dialog.component';
import { ResponseStatusConst } from 'src/app/@shared/const/response-status-const';
import { MessageTypeConst } from 'src/app/@shared/const/message-type-const';

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

  orgBooking!: OrgBookingDto;

  resultsLength = 0;
  serviceItemList!: ItemDetailDto[];
  doctorList!: UserVo[];

  bookingList!: OrgBookingDto[];

  productList!: ProductVo[];

  departmentList!: DepartmentVo[];


  displayedColumns: string[] = ['appNo', 'date', 'patientName','mobileNo','type', 'doctorsName', "time", "action"];
  dataSource = new MatTableDataSource<OrgBookingDto>([] as OrgBookingDto[]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  bookingTypeName: any = BOOKING_TYPE_NAME;

  userBookingInvestigationList!: UserBookingInvestigationDto;

  columnFilters: { [key: string]: string } = {};

  originalDataSource: OrgBookingDto[] = [];
  filteredData: OrgBookingDto[] = [];

  subjectChangeTab = new Subject<string>();


  /* ************************************* Constructors ******************************************** */
  constructor(private userApi: UserApi,
    private keyValueStorageService: KeyValueStorageService,
    private serviceItemApi: ServiceItemApi,
    private bookingApi: BookingApi,
    private productApi: ProductApi,
    private departmentApi: DepartmentApi,
    private glabalEmitterService: GlobalEmitterService,
    private dialog: MatDialog) { }

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

  public cloneAppointment(orgBookingDto: OrgBookingDto): void {
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
    booking.complaint = orgBookingDto.booking.complaint;
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
    this.getBookingList();
  }

  public saveBooking(): void {
    this.bookingApi.addUpdateBooking(this.userBooking).subscribe((res: ApiResponse<UserBookingDto>) => {
      if (res.status === ResponseStatusConst.SUCCESS && res.body) {

        this.userBooking = res.body;
        // this.glabalEmitterService.emitUserSignInEmitter('' + ResponseStatusConst.SUCCESS);
        // this.glabalEmitterService.emitAclChangedEmitter();
        const message = {} as AlertMessage;
        message.type = MessageTypeConst.SUCCESS;
        message.text = 'Added Successfully';
        this.glabalEmitterService.addAlerMsg(message);
        this.subjectChangeTab.next('CHANGE_TAB');
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
    this.getBookingList();
  }

  public getBookingList() {
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
        this.originalDataSource = [...this.bookingList];
      });
  }

  // public applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

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

  public deleteBooking(bookingId: string): void { 
    this.bookingApi.deleteBooking(bookingId).subscribe(() => {
      this._init();
      this.getBookingList();
    });
  }

  confirmDeleteBooking(bookingId: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this booking?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteBooking(bookingId);
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

  public _getDepartmentList() {
    const orgId = this.keyValueStorageService.getOrgId();
    if (!orgId) {
      return;
    }
    this.departmentApi.getOrgDepartmentList(orgId, DEPT.PATIENT_RELATED).subscribe((res: ApiResponse<DepartmentVo[]>) => {
      this.departmentList = res.body ?? [] as DepartmentVo[];
    })
  }

  /* ************************************* Private Methods ******************************************** */
  private _init(): void {
    this._resetSection();
    this.showSectionAppointmentList = true;
    this._getServiceList();
    this._getDoctorList();
    this._getProductList();
    this._getDepartmentList();
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

  private getCellValue(data: OrgBookingDto, columnName: string): string | undefined {
    if (columnName === 'appNo' && data.booking.no) {
      return data.booking.no.toLocaleLowerCase();
    }
    else if (columnName === 'date' && data.booking.bookingDate) {
      return data.booking.bookingDate.toString();
    }
    else if (columnName === 'patientName' && data.patient.nameF) {
      return data.patient.nameF.toLowerCase();
    }
    else if (columnName === 'mobileNo' && data.patient.cell) {
      return data.patient.cell.toLowerCase();
    }
    else if (columnName === 'type' && data.booking.type) {
      return data.booking.type.toLowerCase();
    }
    else if (columnName === 'doctorsName' && data.drDetail?.nameF) {
      return data.drDetail?.nameF.toLowerCase();
    }
    else if (columnName === 'time' && data.booking.timeSlot) {
      return data.booking.timeSlot.toLowerCase();
    }
    return undefined;

  }

}


