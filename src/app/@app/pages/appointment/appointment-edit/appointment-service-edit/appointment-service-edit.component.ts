import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookingUtility, BookingVo, ItemDetailDto, ItemVo, OrderItemVo } from 'aayam-clinic-core';
import { UiActionDto } from 'src/app/@shared/dto/ui-action.dto';
import { MatDialog } from '@angular/material/dialog';
import { BillingComponent } from 'src/app/@shared/component/billing/billing.component';


@Component({
    selector: 'app-appointment-service-edit',
    templateUrl: './appointment-service-edit.component.html'
})
export class AppointmentServiceEditComponent implements OnInit {
    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */
    inValidServiceEditForm!: boolean;

    @Input()
    booking!: BookingVo;
    @Output()
    bookingChange = new EventEmitter<BookingVo>();

    @Output()
    pubSub = new EventEmitter<any>();

    @ViewChild('serviceForm', { static: true })
    serviceForm!: NgForm;

    @Input()
    serviceItemList!: ItemDetailDto[];

    displayedColumns: string[] = ['name', 'doctorName', 'price', 'description', 'action'];
    dataSource!: MatTableDataSource<ItemDetailDto>;
    @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort!: MatSort;


    orderItemsList: Array<OrderItemVo> = [];
    bookingItemsList!: BookingVo; 

    /* ************************************ Constructors ************************************ */
    constructor(private dialog: MatDialog) {
    }

    /* ************************************ Public Methods ************************************ */
    public ngOnInit(): void {
        this._init();
        // @ts-ignore
        this.serviceForm.valueChanges.subscribe(() => {
            this._formChanged();
        });

        this.orderItemsList = this.booking.items;
        this.bookingItemsList = this.booking;

    }

    public addressFormChange(event: UiActionDto<boolean>): void {
        switch (event.action) {
            case 'CHANGE_FORM_APPOINTMENT_SERVICE':
                this.inValidServiceEditForm = event.data;
                this._formChanged();
                break;
        }
    }

    public applyFilter(filterValue: any): void {
        this.dataSource.filter = filterValue.value.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    public setOrderItem(event: MatCheckboxChange, item: ItemDetailDto): void {
        this.calculateOrderTotal(event.checked, this.booking, item.item, event.checked ? 1 : 0, '');
    }

    public calculateOrderTotal(itemAdded: boolean, booking: BookingVo, item: ItemVo, qty: number, note: string): void {
        BookingUtility.updateBookingItemAndCalcTotal(itemAdded, booking, item, qty, note);
        this.bookingChange.emit(booking);
        console.log(booking);
        console.log(booking.subTotal);
    }

    public showTotal(): void {
        console.log("xxxx total is :")
        this._confirmRemoveItem();

    }

    /* ************************************ Private Methods ************************************ */
    private _init(): void {
        this.booking.items = [] as OrderItemVo[];
        this._initServiceItemTable(this.serviceItemList);
    }

    private _formChanged(): void {
        const actionDto = {
            action: 'CHANGE_FORM_PATIENT',
            data: this.serviceForm.invalid
        } as UiActionDto<boolean>;
        this.pubSub.emit(actionDto);
    }

    private _initServiceItemTable(serviceItemList: Array<ItemDetailDto>): void {
        this.dataSource = new MatTableDataSource(serviceItemList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    private _confirmRemoveItem(): void {
        this.orderItemsList = this.booking.items;
        this.bookingItemsList = this.booking;
        const dialogRef = this.dialog.open(BillingComponent, {
            width: '50%',
            data: { bookingItemsList: this.bookingItemsList, orderItemsList: this.orderItemsList }
        });
        
        dialogRef.afterClosed().subscribe(result => {
            // if (result) {
            //     this.test.splice(index, 1);
            // }
            console.log('xxxxclosed')
        });
    }

}