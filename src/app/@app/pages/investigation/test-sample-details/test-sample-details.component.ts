import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse, BookingVo, ItemVo, OrderItemVo, OrgBookingDto, ResponseStatus, UserBookingDto } from 'aayam-clinic-core';
import { PatientIdBarCodeDialogComponent } from '../patient-id-bar-code-dialog/patient-id-bar-code-dialog.component';
import { TestIdBarCodeDialogComponent } from '../test-id-bar-code-dialog/test-id-bar-code-dialog.component';
import { BookingApi } from 'src/app/@app/service/remote/booking.api';
import { ResponseStatusConst } from 'src/app/@shared/const/response-status-const';

@Component({
    selector: 'app-test-sample-details',
    templateUrl: './test-sample-details.component.html',
    styleUrls: ['./test-sample-details.component.scss']
})

export class TestSampleDetailsComponent implements OnInit, OnChanges {
    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */
    displayedColumns: string[] = ['sno', 'investigationName', 'specimen', "sampleCollected", 'sampleDate', 'time', 'action'];
    dataSource!: MatTableDataSource<OrderItemVo>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    showTestIdBarcode: boolean = false;
    showPatientIdBarcode: boolean = false;

    @Input()
    booking!: OrgBookingDto;
    @Output()
    bookingChange = new EventEmitter<OrgBookingDto>();

    userBooking!: UserBookingDto;

    /* ************************************* Constructors ******************************************** */
    constructor(public dialog: MatDialog,
        private bookingApi: BookingApi,
        
        ) { }

    /* ************************************* Public Methods ******************************************** */
    public ngOnInit(): void {
        this._init();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['booking']) {
            this.booking = changes['booking'].currentValue as OrgBookingDto;
        }
    }

    public applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    public openDialogPatientId(enterAnimationDuration: string, exitAnimationDuration: string, row:OrderItemVo): void {
        const booking = this.booking;
        this.dialog.open(PatientIdBarCodeDialogComponent, {
            data: {row, booking},
            width: '550px',
            height: '550px',
            enterAnimationDuration,
            exitAnimationDuration,
        });
    }

    public openDialogTestId(enterAnimationDuration: string, exitAnimationDuration: string): void {
        this.dialog.open(TestIdBarCodeDialogComponent, {
            width: '550px',
            height: '550px',
            enterAnimationDuration,
            exitAnimationDuration,
        });
    }

    public sampleCollectionChange(event: MatCheckboxChange, itemId: string): void {
        const date = event.checked ? new Date() : null;
        const orderItemIndex = this.booking?.booking?.items?.findIndex((it: OrderItemVo) => { return it?.item?._id === itemId });
        if (orderItemIndex >= 0) {
            this.booking.booking.items[orderItemIndex].sampleCollectDate = date;
            this.bookingChange.emit(this.booking);
            this._initItemTable();
            //TODO: Save booking data

            this.bookingApi.addUpdateBooking(this.userBooking).subscribe((res: ApiResponse<UserBookingDto>) => {
                if (res.status === ResponseStatusConst.SUCCESS && res.body) {
                  this.userBooking = res.body
                  this.bookingChange.emit(this.booking);
                }
              });
        }
    }

    /* ************************************* Private Methods ******************************************** */
    private _init(): void {
        const userBooking = {} as UserBookingDto;
        userBooking.booking = this.booking.booking;
        this.userBooking = userBooking;

        this._initItemTable();
    }

    private _initItemTable(): void {
        const items = this.booking?.booking?.items?.filter((item: OrderItemVo) => {
            return item && item.item && (item.item as ItemVo).investigationParam;
        });
        if (items.length > 0) {
            this.dataSource = new MatTableDataSource(items);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }
    }

}