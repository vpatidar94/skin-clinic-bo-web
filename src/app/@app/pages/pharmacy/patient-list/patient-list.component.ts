
import { Component, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse, BOOKING_TYPE, BOOKING_TYPE_NAME, BookingUtility, DosageUtility, OrderItemVo, OrgBookingCountDto, OrgBookingDto, PharmacyOrderVo, PrescriptionVo, ProductVo } from 'aayam-clinic-core';
import { catchError, map, of as observableOf, startWith, switchMap, } from 'rxjs';
import { BookingApi } from 'src/app/@app/service/remote/booking.api';
import { PharmacyApi } from 'src/app/@app/service/remote/pharmacy.api';
import { ProductApi } from 'src/app/@app/service/remote/product.api';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { PrescriptionDialogComponent } from './prescription-dialog/prescription-dialog.component';

@Component({
    selector: 'app-patient-list',
    templateUrl: './patient-list.component.html',
    styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent {
    /* ************************************* Static Field ********************************************* */
    /* ************************************* Instance Field ******************************************** */
    displayedColumns: string[] = ['appNo', 'date', 'patientName', 'type', 'doctorsName', "time", "action"];
    dataSource = new MatTableDataSource<OrgBookingDto>([] as OrgBookingDto[]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    resultsLength = 0;
    bookingList!: OrgBookingDto[];

    columnFilters: { [key: string]: string } = {};

    originalDataSource: OrgBookingDto[] = [];
    filteredData: OrgBookingDto[] = [];

    bookingTypeName: any = BOOKING_TYPE_NAME;

    /* ************************************* Constructors ******************************************** */
    constructor(private keyValueStorageService: KeyValueStorageService,
        private productApi: ProductApi,
        private pharmacyApi: PharmacyApi,
        private bookingApi: BookingApi,
        private dialog: MatDialog
    ) {
    }

    /* ************************************* Public Methods ******************************************** */
    public ngOnInit(): void {
        this._init();
    }

    public getBookingType(type: string): string {
        if (!type) {
            return '';
        }
        return this.bookingTypeName[type] as string;
    }

    public moveToPharmacy(row: OrgBookingDto): void {
        const pharmacyBooking = {} as PharmacyOrderVo;
        const booking = row?.booking;
        pharmacyBooking.prescription = booking.prescription;
        pharmacyBooking.bookingId = booking?._id?.toString();
        pharmacyBooking.orgId = booking.orgId;
        pharmacyBooking.brId = booking.brId;
        pharmacyBooking.user = booking.user;
        pharmacyBooking.items = [] as OrderItemVo[];
        pharmacyBooking.status = 'IN_PROGRESS';
        this.pharmacyApi.addUpdateOrder(pharmacyBooking).subscribe((res: ApiResponse<PharmacyOrderVo>) => {
            this._init();
        });
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
                this.bookingList = this.bookingList?.filter(it => it.pharmacyOrderId == null);
                this.dataSource = new MatTableDataSource(this.bookingList);
                this.originalDataSource = [...this.bookingList];
            });
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

    public openPrescriptionDialog(enterAnimationDuration: string, exitAnimationDuration: string, booking: OrgBookingDto[]): void {
        this.dialog.open(PrescriptionDialogComponent, {
            width: '1200px',
            height: '550px',
            enterAnimationDuration,
            exitAnimationDuration,
            data: { originalDataSource: this.originalDataSource, booking: booking }
        });
    }

    /* ************************************* Private Methods ******************************************** */
    private _init(): void {
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
