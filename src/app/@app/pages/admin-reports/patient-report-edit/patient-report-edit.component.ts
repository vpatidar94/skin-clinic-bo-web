import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PatientDialogDateComponent } from './patient-dialog-date.component';
import { UserApi } from 'src/app/@app/service/remote/user.api';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { ApiResponse, BOOKING_TYPE, BookingVo, DEPT, DepartmentVo, OrgBookingCountDto, OrgBookingDto, UserBookingDto, UserVo } from 'aayam-clinic-core';
import { DepartmentApi } from 'src/app/@app/service/remote/department.api';
import * as XLSX from 'xlsx';
import { Subject, catchError, map, of as observableOf, startWith, switchMap } from 'rxjs';

import { BookingApi } from 'src/app/@app/service/remote/booking.api';

export interface PeriodicElement {
    date: string;
    patientId: string;
    visitId: string;
    patientName: string;
    department: any;
    doctorName: string;
    referredBy: string;
    amountDeposit: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { date: '2024-06-26', patientId: "001", visitId: "012", patientName: 'Ram Patidar', department: 'Pathology', doctorName: 'Ramesh Mahjan', referredBy: 'Dr. Ram', amountDeposit: '1000' },
    { date: '2024-06-26', patientId: "002", visitId: "012", patientName: 'Rahul Yadav', department: 'USG', doctorName: '-', referredBy: 'Dr. Ram', amountDeposit: '1000' },
    { date: '2024-06-27', patientId: "003", visitId: "012", patientName: 'Keshav Patel', department: 'MRI', doctorName: '-', referredBy: 'Dr. Ram', amountDeposit: '1000' },
    { date: '2024-06-28', patientId: "003", visitId: "012", patientName: 'Tarun Gandhi', department: 'MRI', doctorName: '-', referredBy: 'Dr. Ram', amountDeposit: '1000' },
    { date: '2024-06-29', patientId: "003", visitId: "012", patientName: 'Hitesh Singh', department: 'MRI', doctorName: '-', referredBy: 'Dr. Ram', amountDeposit: '1000' },
    { date: '2024-06-29', patientId: "003", visitId: "012", patientName: 'Yatindra Sahu', department: 'MRI', doctorName: '-', referredBy: 'Dr. Ram', amountDeposit: '1000' },

]

@Component({
    selector: 'app-patient-report-edit',
    templateUrl: './patient-report-edit.component.html',
    styleUrls: ['./patient-report-edit.component.scss'],
})

export class PatientReportEditComponent implements OnInit, AfterViewInit {

    /* ************************************* Static Field ********************************************* */
    /* ************************************* Instance Field ******************************************** */

    // displayedColumns: string[] = ['date', 'patientId', 'visitId', 'patientName', "department", 'doctorName', 'referredBy', 'amountDeposit'];
    displayedColumns: string[] = ['date', 'patientId','visitId', 'patientName','doctorName', ];

    // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    dataSource = new MatTableDataSource<OrgBookingDto>([] as OrgBookingDto[]);
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    showCustomDateInput: boolean = false;

    selectTabValue!: string;
    selectedFromDate!: Date | null;
    selectedToDate!: Date | null;

    userBooking!: UserBookingDto;
    departmentList!: DepartmentVo[];
    docterList!: UserVo[];

    showIncome: boolean = false;

    selectedReportOption: any = 'TODAY';  // Default to 'TODAY'

    allIncomeData: any[] = [];
    allExpenseData: any[] = [];

    // allIncomeData: PeriodicElement[] = [];
    // allExpenseData: PeriodicElement[] = [];

    incomeList!: any[];
    expenseList!: any[];

    resultsLength = 0;
    bookingList!: OrgBookingDto[];
    originalDataSource: OrgBookingDto[] = [];

    /* ************************************* Constructors ******************************************** */
    constructor(private dialog: MatDialog,
        private userApi: UserApi,
        private keyValueStorageService: KeyValueStorageService,
        private departmentApi: DepartmentApi,
        private bookingApi: BookingApi,
    ) { }
    /* ************************************* Public Methods ******************************************** */

    public ngAfterViewInit() {
        this.paginator.showFirstLastButtons = false;
        this.paginator.hidePageSize = false;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
    

    public applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    public ngOnInit(): void {
        this._init();
        console.log("console is",this.dataSource);
        console.log("original", this.originalDataSource)
        // this.allIncomeData = this.dataSource;
        // this.incomeList = this.dataSource;
        this.dataSource.data = this.bookingList;
        console.log("jit",this.dataSource.data);
    }

    public cancel(): void {
        this._init();
    }

    public onReportSelectChange(event: any) {
        // const selectElement = event.target as HTMLSelectElement;
        // this.showCustomDateInput = selectElement.value === 'CUSTOM';
        // if (this.showCustomDateInput) {
        //     this._showCalenderPopup();
        // }
    
            this.selectedReportOption = event.target.value;
            // Update your data source based on the selected option
    
            // const selectElement = event.target as HTMLSelectElement;
            // this.showCustomDateInput = selectElement.value === 'CUSTOM';
            this.showCustomDateInput = this.selectedReportOption === 'CUSTOM';
    
            if (this.showCustomDateInput) {
                this._showCalenderPopup();
            }
    
            this.updateTableData();
    
        }
    

    public _showCalenderPopup(): void {
        this.dialog.open(PatientDialogDateComponent, {
            width: '500px',
        });
    }

    public selectExcel(): void {
        // const data: PeriodicElement[] = this.dataSource.data;
        const data: OrgBookingDto[] = this.dataSource.data;


        // Create a worksheet
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

        // Create a workbook
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        // Save the workbook as an Excel file
        XLSX.writeFile(wb, 'report.xlsx');
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

    public onDepartmentChange(event: any): void {
        console.log('Department changed:', event);
        this.filterDoctorByDepartmentId(this.userBooking.booking.departmentId);
    }

    /* ************************************* Private Methods ******************************************** */
    private _init(): void {
        const userBooking = {} as UserBookingDto;
        const booking = {} as BookingVo;
        userBooking.booking = booking;
        this.userBooking = userBooking;
        this.userBooking.booking.departmentId = '';
        this._getDepartmentList();
    }
    public onDepartmentSelect(selectedItem: any): void {
        console.log('Selected department:', selectedItem);
        this.filterDoctorByDepartmentId(selectedItem.item_id);
    }


    public exportToExcel() {
        // const data: PeriodicElement[] = this.dataSource.data;
        const data: OrgBookingDto[] = this.dataSource.data;


        // Create a worksheet
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

        // Create a workbook
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        // Save the workbook as an Excel file
        XLSX.writeFile(wb, 'report.xlsx');
    }



    // updateTableData() {
    //     const currentDate = new Date().toISOString().split('T')[0];
    //     const today = new Date(currentDate);

    //     let filteredData = [];

    //     switch (this.selectedReportOption) {

    //         case 'TODAY':
    //             console.log(currentDate);
    //             console.log(today)

    //             filteredData = this.showIncome ? this.allIncomeData.filter(item => item.date === currentDate) : this.allExpenseData.filter(item => item.date === currentDate);
    //             break;

    //         case 'YESTERDAY':
    //             const yesterday = new Date(today);
    //             yesterday.setDate(today.getDate() - 1);
    //             const yesterdayDateString = yesterday.toISOString().split('T')[0];
    //             filteredData = this.showIncome ? this.allIncomeData.filter(item => item.date === yesterdayDateString) : this.allExpenseData.filter(item => item.date === yesterdayDateString);
    //             break;

    //         case 'LASTSEVEN':
    //             const lastSevenDays = new Date(today);
    //             lastSevenDays.setDate(today.getDate() - 7);
    //             const lastSevenDaysDateString = lastSevenDays.toISOString().split('T')[0];
    //             filteredData = this.showIncome ? this.allIncomeData.filter(item => new Date(item.date) >= lastSevenDays) : this.allExpenseData.filter(item => new Date(item.date) >= lastSevenDays);
    //             break;

    //         case 'LASTFIFTEEN':
    //             const lastFifteenDays = new Date(today);
    //             lastFifteenDays.setDate(today.getDate() - 15);
    //             const lastFifteenDaysDateString = lastFifteenDays.toISOString().split('T')[0];
    //             filteredData = this.showIncome ? this.allIncomeData.filter(item => new Date(item.date) >= lastFifteenDays) : this.allExpenseData.filter(item => new Date(item.date) >= lastFifteenDays);
    //             break;

    //         case 'LASTONEMONTH':
    //             const lastOneMonth = new Date(today);
    //             lastOneMonth.setMonth(today.getMonth() - 1);
    //             const lastOneMonthDateString = lastOneMonth.toISOString().split('T')[0];
    //             filteredData = this.showIncome ? this.allIncomeData.filter(item => new Date(item.date) >= lastOneMonth) : this.allExpenseData.filter(item => new Date(item.date) >= lastOneMonth);
    //             break;

    //         case 'CUSTOM':
    //             // if (this.customStartDate && this.customEndDate) {
    //             //     const start = this.customStartDate.toISOString().split('T')[0];
    //             //     const end = this.customEndDate.toISOString().split('T')[0];

    //             //     filteredData = this.showIncome ? this.allIncomeData.filter(item => item.date >= start && item.date <= end) : this.allExpenseData.filter(item => item.date >= start && item.date <= end);
    //             // }
    //             break;

    //         default:
    //             // Handle the 'CUSTOM' case or other cases if needed
    //             break;
    //     }

    //     // Update dataSource with the filtered data
    //     this.dataSource = new MatTableDataSource(filteredData);

    //     // Update incomeList and expenseList
    //     if (this.showIncome) {
    //         this.incomeList = filteredData;
    //     } else {
    //         this.expenseList = filteredData;
    //     }

    //     // Refresh MatPaginator and MatSort
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    // }

    // updateTableData() {
    //     const currentDate = new Date().toISOString().split('T')[0];
    //     // const currentDate = new Date();

    //     const today = new Date(currentDate);
    
    //     // let filteredData: PeriodicElement[] = [];
    //     let filteredData: OrgBookingDto[] = [];

    
    //     switch (this.selectedReportOption) {
    //         case 'TODAY':
    //             // filteredData = ELEMENT_DATA.filter(item => item.date === currentDate);
    //             filteredData = this.bookingList.filter(item => item.booking.bookingDate.toISOString().split('T')[0] === currentDate);

    //             break;
    //         case 'YESTERDAY':
    //             const yesterday = new Date(today);
    //             yesterday.setDate(today.getDate() - 1);
    //             // const yesterdayDateString = yesterday.toISOString().split('T')[0];
    //             const yesterdayDateString = yesterday;

    //             // filteredData = ELEMENT_DATA.filter(item => item.date === yesterdayDateString);
    //             filteredData = this.bookingList.filter(item => item.booking.bookingDate === yesterdayDateString);

    //             break;
    //         // case 'LASTSEVEN':
    //         //     const lastSevenDays = new Date(today);
    //         //     lastSevenDays.setDate(today.getDate() - 7);
    //         //     filteredData = ELEMENT_DATA.filter(item => new Date(item.date) >= lastSevenDays);
    //         //     break;
    //         // case 'LASTFIFTEEN':
    //         //     const lastFifteenDays = new Date(today);
    //         //     lastFifteenDays.setDate(today.getDate() - 15);
    //         //     filteredData = ELEMENT_DATA.filter(item => new Date(item.date) >= lastFifteenDays);
    //         //     break;
    //         // case 'LASTONEMONTH':
    //         //     const lastOneMonth = new Date(today);
    //         //     lastOneMonth.setMonth(today.getMonth() - 1);
    //         //     filteredData = ELEMENT_DATA.filter(item => new Date(item.date) >= lastOneMonth);
    //         //     break;
    //         case 'CUSTOM':
    //             // Handle custom date range if needed
    //             break;
    //         default:
    //             break;
    //     }
    
    //     // Update dataSource with the filtered data
    //     this.dataSource.data = filteredData;
    
    //     // Refresh MatPaginator and MatSort
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    // }




    updateTableData() {
    const today = new Date();
    const currentDate = today.toISOString().split('T')[0];

    let filteredData: OrgBookingDto[] = [];

    switch (this.selectedReportOption) {
        case 'TODAY':
            filteredData = this.bookingList.filter(item => {
                const bookingDate = new Date(item.booking.bookingDate);
                return bookingDate.toISOString().split('T')[0] === currentDate;
            });
            break;
        case 'YESTERDAY':
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            const yesterdayDateString = yesterday.toISOString().split('T')[0];
            filteredData = this.bookingList.filter(item => {
                const bookingDate = new Date(item.booking.bookingDate);
                return bookingDate.toISOString().split('T')[0] === yesterdayDateString;
            });
            break;
        case 'LASTSEVEN':
            const lastSevenDays = new Date(today);
            lastSevenDays.setDate(today.getDate() - 7);
            filteredData = this.bookingList.filter(item => {
                const bookingDate = new Date(item.booking.bookingDate);
                return bookingDate >= lastSevenDays;
            });
            break;
        case 'LASTFIFTEEN':
            const lastFifteenDays = new Date(today);
            lastFifteenDays.setDate(today.getDate() - 15);
            filteredData = this.bookingList.filter(item => {
                const bookingDate = new Date(item.booking.bookingDate);
                return bookingDate >= lastFifteenDays;
            });
            break;
        case 'LASTONEMONTH':
            const lastOneMonth = new Date(today);
            lastOneMonth.setMonth(today.getMonth() - 1);
            filteredData = this.bookingList.filter(item => {
                const bookingDate = new Date(item.booking.bookingDate);
                return bookingDate >= lastOneMonth;
            });
            break;
        case 'CUSTOM':
            // Handle custom date range if needed
            break;
        default:
            break;
    }

    // Update dataSource with the filtered data
    this.dataSource.data = filteredData;

    // Refresh MatPaginator and MatSort
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
}

    
    
}
