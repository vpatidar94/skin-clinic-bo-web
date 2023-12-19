import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ApiResponse, BookingUtility, BookingVo, InvestigationParamVo, ItemDetailDto, ItemVo, OrderItemVo, ServiceTypeVo, UserBookingDto, UserBookingInvestigationDto } from 'aayam-clinic-core';
import { InvestigationApi } from 'src/app/@app/service/remote/investigation.api';
import { ServiceItemApi } from 'src/app/@app/service/remote/service-item.api';
import { UiActionDto } from 'src/app/@shared/dto/ui-action.dto';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';


@Component({
    selector: 'app-patient-service-edit',
    templateUrl: './patient-service-edit.component.html',
    styleUrls: ['./patient-service-edit.component.scss']
})
export class PatientServiceEditComponent implements OnInit, OnChanges {
    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */
    inValidServiceEditForm!: boolean;

    @Input()
    userBooking!: UserBookingDto;
    @Output()
    userBookingChange = new EventEmitter<UserBookingDto>();

    @Output()
    pubSub = new EventEmitter<any>();

    @ViewChild('serviceForm', { static: true })
    serviceForm!: NgForm;

    @Input()
    serviceItemList!: ItemDetailDto[];

    @Input()
    userBookingInvestigationList!: UserBookingInvestigationDto;

    cloneServiceItemList!: ItemDetailDto[];

    showSectionAdd = false;

    serviceTypeList!: ServiceTypeVo[];

    // newly added to link service type as investigation with the investigation list
    serviceTypeInvestigation: { [key: string]: string } = {} as { [key: string]: string };

    /* ************************************ Constructors ************************************ */
    constructor(private keyValueStorageService: KeyValueStorageService,
        private serviceItemApi: ServiceItemApi,
        private investigationApi: InvestigationApi,
    ) {
    }

    /* ************************************ Public Methods ************************************ */
    public ngOnInit(): void {
        console.log('lol', this.serviceItemList);


        this._init();
        // @ts-ignore
        this.serviceForm?.valueChanges?.subscribe(() => {
            this._formChanged();
        });
        this.showSectionAdd = this.userBooking.booking?.items?.length > 0;
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['serviceItemList']) {
            this.serviceItemList = changes['serviceItemList'].currentValue;
            this.cloneServiceItemList = changes['serviceItemList'].currentValue;
        }
    }

    public setOrderItem(event: MatCheckboxChange, item: ItemDetailDto): void {
        this.calculateOrderTotal(event.checked, this.userBooking.booking, item.item, event.checked ? 1 : 0, '');
        this.userBookingChange.emit(this.userBooking);
    }

    public calculateOrderTotal(itemAdded: boolean, booking: BookingVo, item: ItemVo, qty: number, note: string): void {
        BookingUtility.updateBookingItemAndCalcTotal(itemAdded, booking, item, qty, note);
        this.userBookingChange.emit(this.userBooking);
    }

    public addItem(event: any, i: number): void {
        const item = this.serviceItemList?.find((item) => item.item._id === event.target.value);
        if (item && item.item) {
            this.userBooking.booking.items[i].item = JSON.parse(JSON.stringify(item.item));
            this.userBooking.booking.items[i].priceBase = item.item.fee;
            this.userBooking.booking.items[i].qty = 1;
            this.userBooking.booking.items[i].name = item.item.name;
            BookingUtility.updateBookingItemAndCalcTotal(true, this.userBooking.booking, item.item, 1, '');
            this.userBookingChange.emit(this.userBooking);
        }
    }

    public isOptionDisabled(id: string): boolean {
        const index = this.userBooking.booking.items?.findIndex(it => it.item?._id === id);
        return index >= 0;
    }

    public addNewService(): void {
        this.showSectionAdd = true;
        this.userBooking.booking.items = [] as OrderItemVo[];
        const orderItem = {} as OrderItemVo;
        orderItem.amount = 0;
        orderItem.item = {} as ItemVo;
        this.userBooking.booking.items.push(orderItem);
        this.userBookingChange.emit(this.userBooking);
    }

    public addServiceItem(): void {
        const orderItem = {} as OrderItemVo;
        orderItem.item = {} as ItemVo;
        orderItem.amount = 0;
        this.userBooking.booking.items.push(orderItem);
        this.userBookingChange.emit(this.userBooking);
    }

    public removeServiceItem(index: number): void {
        this.userBooking.booking.items.splice(index, 1);
        BookingUtility.applyDiscountAndCalPrice(this.userBooking.booking);
        this.userBookingChange.emit(this.userBooking);
    }

    public _getServiceTypeList(): void {
        const orgId = this.keyValueStorageService.getOrgId();
        if (!orgId) {
            return;
        }
        this.serviceItemApi.getServiceTypeList(orgId).subscribe((res: ApiResponse<ServiceTypeVo[]>) => {
            this.serviceTypeList = res.body ?? [] as ServiceTypeVo[];
        });
    }

    public getServiceItemSelectList(index: number): Array<ItemDetailDto> {
        const typeId = this.serviceTypeInvestigation[index];
        return this.serviceItemList?.filter((item: ItemDetailDto) => {
            return item?.item?.serviceTypeId == typeId;
        });
    }

    /* ************************************ Private Methods ************************************ */
    private _init(): void {
        this._getServiceTypeList();
    }

    private _formChanged(): void {
        const actionDto = {
            action: 'CHANGE_FORM_PATIENT',
            data: this.serviceForm.invalid
        } as UiActionDto<boolean>;
        this.pubSub.emit(actionDto);
    }

    public onServiceSelect(event: any, i: number): void {
        const item = this.serviceItemList?.find((item) => item.item._id === event.target.value);
        if (item && item.item) {
            this.userBooking.booking.items[i].item = JSON.parse(JSON.stringify(item.item));
            this.userBooking.booking.items[i].priceBase = item.item.fee;
            this.userBooking.booking.items[i].qty = 1;
            this.userBooking.booking.items[i].name = item.item.name;
            BookingUtility.updateBookingItemAndCalcTotal(true, this.userBooking.booking, item.item, 1, '');
            this.userBookingChange.emit(this.userBooking);
        }
    }

    public getServiceTypeName(row: any): string {
        const serviceType = this.serviceTypeList.find((ser: any) => ser._id === row);
        console.log('ServiceType:', serviceType);
        return serviceType ? serviceType.name : '';
    }

}
