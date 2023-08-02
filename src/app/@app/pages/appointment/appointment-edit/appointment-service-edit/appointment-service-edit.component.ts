import { Component, EventEmitter, Input, OnInit, Output, ViewChild,SimpleChanges,OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookingUtility, BookingVo, ItemDetailDto, ItemVo, OrderItemVo, } from 'aayam-clinic-core';
import { UiActionDto } from 'src/app/@shared/dto/ui-action.dto';
import { MatDialog } from '@angular/material/dialog';
import { BillingComponent } from 'src/app/@shared/component/billing/billing.component';


@Component({
    selector: 'app-appointment-service-edit',
    templateUrl: './appointment-service-edit.component.html',
    styleUrls: ['./appointment-service-edit.component.scss']
})
export class AppointmentServiceEditComponent implements OnInit,OnChanges {
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

    // dropdownList = [
    //     { item_id: 1, item_text: 'Therapy' },
    //     { item_id: 2, item_text: 'Consultation' },
    //     { item_id: 3, item_text: 'Pune' },
    //     { item_id: 4, item_text: 'Navsari' },
    //     { item_id: 5, item_text: 'New Delhi' }
    // ];
   

    // newly added today
    serviceCount = 1;
    services: any[] = [{ count: 1 }];

//   addNewService() {
//     this.serviceCount++;
//     this.services.push({ id: this.serviceCount });
//   }

//   removeService(serviceId: number) {
//     if (this.services.length > 1) {
//       const index = this.services.findIndex((service) => service.id === serviceId);
//       if (index !== -1) {
//         this.services.splice(index, 1);
//       }
//     }
//   }
addNewService() {
    this.serviceCount++;
    // this.services.push({ count: this.serviceCount });
    this.services.push([] as ItemDetailDto[]);

  }

//   removeService() {
//     if (this.services.length > 1) {
//       this.services.pop();
//     }
//   }

  public removeService(index: number): void {
    this.services.splice(index, 1);
}

    serviceSelectList!: Array<any>;
    selectedServices = [];
    dropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        itemsShowLimit: 3,
        allowSearchFilter: true,
        enableCheckAll: false,
        maxHeight: 500
    };

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
        console.log(";;;;;",this.serviceItemList)

    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['serviceItemList']) {
            this.serviceItemList = changes['serviceItemList'].currentValue;
            this.serviceSelectList = this.serviceItemList.map((item:ItemDetailDto) => {
                return { item_id: item.item._id, item_text: `${item.item.name}` };
            });
        }
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


    onItemSelect(item: any) {
        console.log(item);
    }
    onSelectAll(items: any) {
        console.log(items);
    }

    onDocSelect(item: any) {
        // this.userBooking.booking.dr = this.selectedServices.map((doc: any) => doc.item_id);
        // this.userBookingChange.emit(this.userBooking);
        // this.serviceItemList = this.selectedServices.map((doc: any) => doc.item_id);


        
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
