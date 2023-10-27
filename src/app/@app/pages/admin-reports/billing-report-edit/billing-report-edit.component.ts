import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BillingDialogDateComponent } from './billing-dialog-date.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiResponse, BookingVo, DEPT, DepartmentVo, UserBookingDto, UserVo } from 'aayam-clinic-core';
import { UserApi } from 'src/app/@app/service/remote/user.api';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { DepartmentApi } from 'src/app/@app/service/remote/department.api';

export interface PeriodicElement {
  date: string;
  billNo: string;
  receiptNo: string;
  patientName: string;
  department: any;
  doctorName: string;
  amount: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { date: '01/10/2023', billNo: "001", receiptNo: '01254', patientName: 'Ram Patidar', department: 'Pathology', doctorName: 'Ramesh Mahajan', amount: '1000' },
  { date: '01/10/2023', billNo: "002", receiptNo: '01254', patientName: 'Rahul Yadav', department: 'USG', doctorName: 'Rajiv Dixit', amount: '1000' },
  { date: '01/10/2023', billNo: "003", receiptNo: '01254', patientName: 'Keshav Patel', department: 'MRI', doctorName: 'Gitanshu Pandit', amount: '1000' },
  { date: '01/10/2023', billNo: "003", receiptNo: '01254', patientName: 'Tarun Gandhi', department: 'MRI', doctorName: 'Hitesh Patidar', amount: '1000' },
  { date: '01/10/2023', billNo: "003", receiptNo: '01254', patientName: 'Hitesh Singh', department: 'MRI', doctorName: 'Rajat Jain', amount: '1000' },
  { date: '01/10/2023', billNo: "003", receiptNo: '01254', patientName: 'Yatindra Sahu', department: 'MRI', doctorName: 'Jay Shah', amount: '1000' },

]

@Component({
  selector: 'app-billing-report-edit',
  templateUrl: './billing-report-edit.component.html',
  styleUrls: ['./billing-report-edit.component.scss'],
})

export class BillingReportEditComponent implements OnInit, AfterViewInit {

  /* ************************************* Static Field ********************************************* */
  /* ************************************* Instance Field ******************************************** */

  displayedColumns: string[] = ['date', 'billNo', 'receiptNo', 'patientName', "department", 'doctorName', 'amount'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  showCustomDateInput: boolean = false;

  selectTabValue!: string;
  selectedFromDate!: Date | null;
  selectedToDate!: Date | null;

  userBooking!: UserBookingDto;
  departmentList!: DepartmentVo[];
  docterList!: UserVo[];


  /* ************************************* Constructors ******************************************** */
  constructor(private dialog: MatDialog,
    private userApi: UserApi,
    private keyValueStorageService: KeyValueStorageService,
    private departmentApi: DepartmentApi,
  ) { }

  /* ************************************* Public Methods ******************************************** */

  public ngAfterViewInit() {
    this.paginator.showFirstLastButtons = false;
    this.paginator.hidePageSize = false;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public ngOnInit(): void {
    this._init();
  }

  public cancel(): void {
    this._init();
  }

  public onReportSelectChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.showCustomDateInput = selectElement.value === 'CUSTOM';
    if (this.showCustomDateInput) {
      this._showCalenderPopup();
    }
  }

  public _showCalenderPopup(): void {
    this.dialog.open(BillingDialogDateComponent, {
      width: '500px',
    });
  }

  public selectExcel(): void {
  }

  public filterDoctorByDepartmentId(departmentId: string, fetchTimeSlot: boolean = false): void {
    const orgId = this.keyValueStorageService.getOrgId();
    if (!orgId) {
      return;
    }
    this.userApi.getDoctorListByDepartmentId(orgId, departmentId).subscribe((res: ApiResponse<UserVo[]>) => {
      if (res.body && res.body?.length > 0) {
        this.docterList = res.body;
        if (this.userBooking.booking?.dr && fetchTimeSlot) {
        }
      }
    }
    );

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
    const userBooking = {} as UserBookingDto;
    const booking = {} as BookingVo;
    userBooking.booking = booking;
    this.userBooking = userBooking;
    this._getDepartmentList();
  }

}
