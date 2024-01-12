import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PrescriptionVo, BookingVo, UserBookingDto, ProductVo, ApiResponse, OrgPharmacyOrderDto, PharmacyOrderVo, OrderItemVo } from 'aayam-clinic-core';
import { UiActionDto } from 'src/app/@shared/dto/ui-action.dto';

//newly added to show table
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { ProductApi } from 'src/app/@app/service/remote/product.api';

export interface PeriodicElement {
    sno: number;
    medicine: string;
    dosage: string;
    duration: string;
    packing: string;
    quantity: number;
    rate: number;
    // discount is newly added 
    discount: number;
    amount: number;
    action: string;
    showInputFields?: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { sno: 1, medicine: 'Tab Acifin p 500mg', dosage: 'BD', duration: '5 days', packing: "1 * 3", quantity: 8, rate: 60.20, discount: 0, amount: 0, action: '' },
    { sno: 2, medicine: 'Tab Azee 500mg', dosage: 'OD', duration: '2 days', packing: "1 * 4", quantity: 5, rate: 60, discount: 0, amount: 0, action: '' },
    { sno: 3, medicine: 'Sy Cherycof', dosage: 'OD', duration: '5 days', packing: "1 * 9", quantity: 5, rate: 60, discount: 0, amount: 0, action: '' },
    { sno: 4, medicine: 'Tab Azithromycin 650mg', dosage: 'OD', duration: '15 days', packing: "1 * 9", quantity: 10, rate: 60, discount: 0, amount: 0, action: '' },

]
ELEMENT_DATA.forEach(item => {
    item.amount = item.rate * item.quantity; // Calculate the amount for each item
});

@Component({
    selector: 'app-billing',
    templateUrl: './billing.component.html',
    styleUrls: ['./billing.component.scss']
})

export class BillingComponent {

    /* ********************************* Static Field *************************************** */

    // newly added
    overallDiscount: number = 0;

    displayedColumns: string[] = ['sno', 'medicine', 'dosage', "duration", "packing", "quantity", "rate", "discount", "amount", "action"];
    // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    dataSource = new MatTableDataSource<OrderItemVo>([] as OrderItemVo[]);



    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    showChequeInbox: boolean = false;
    showInputFields: boolean = false;
    openItem: boolean = false;

    @Input()
    selectedMedicine!: string[];

    @Input()
    pharmacyOrder!: OrgPharmacyOrderDto;

    @Input()
    pharmacyItem!: OrderItemVo[];

    @Input()
    productList!: ProductVo[];



    /* ************************************* Constructors ******************************************** */
    constructor(private keyValueStorageService: KeyValueStorageService,
        private productApi: ProductApi) {
    }

    /* ************************************* Public Methods ******************************************** */
    public ngOnInit(): void {
        // Set the flag to true for the last row by default
        if (this.dataSource.data.length > 0) {
            this.dataSource.data[this.dataSource.data.length - 1].openItem = false;
        }
        this._init();
        this.dataSource = new MatTableDataSource(this.pharmacyItem);


    }

    public onPaymentModeChange(event: Event) {
        const selectElement = event.target as HTMLSelectElement;
        this.showChequeInbox = selectElement.value === 'Cheque';
    }

   
    public updateAmount(row: OrderItemVo): void {
        row.amount = row.priceBase * row.qty;
        this.getTotalAmount();
    }

    public getTotalAmount(): number {
        // return this.dataSource.data.reduce((total, row) => total + row.amount, 0);
        // return this.dataSource.data.reduce((total, row) => total + (row.quantity * row.rate) - row.discount, 0);
        return this.dataSource.data.reduce((total, row) => total + (row.qty * row.priceBase), 0);
    }

    // newly added
    public getFinalAmount(): number {
        return this.dataSource.data.reduce((total, row) => total + (row.qty * row.priceBase), 0) - this.overallDiscount;
        // return 1;
    }
    

    public deleteRow(row: OrderItemVo): void {
        const index = this.dataSource.data.indexOf(row);
        if (index !== -1) {
            this.dataSource.data.splice(index, 1);
            this.dataSource._updateChangeSubscription();
            this.updateSnoValues(); // Update sno values
            this.getTotalAmount(); // Recalculate total amount
        }
    }

    public updateSnoValues(): void {
        // this.dataSource.data.forEach((row, index) => {
        //     row.sno = index + 1;
        // });
    }

    public addNewRow(): void {
        // Set the flag to false for the previous last row
        if (this.dataSource.data.length > 0) {
            this.dataSource.data[this.dataSource.data.length - 1].openItem = false;

        }
        // Add the new row with input fields visible
        const newRow: OrderItemVo = {
            item: null,
            qty: 0,
            note: "",
            status: "",
            taxInclusive: false,
            priceBase: 0,
            tax: 0,
            amount: 0,
            igst: 0,
            cgst: 0,
            sgst: 0,
            openItem: true,
            name: "",
            sampleCollectDate: null,

        };
        this.dataSource.data.push(newRow);
        this.dataSource._updateChangeSubscription();
        // // Set the flag to true to show input fields
        this.openItem = true;

    }
   
    public isLastRow(row: OrderItemVo): boolean {
        const index = this.dataSource.data.indexOf(row);
        return index === this.dataSource.data.length - 1;
        return true;
    }

    public printData(): void {
    }

    /* ************************************* Private Methods ******************************************** */

    private _init(): void {
        console.log('xx xxx xx ', this.pharmacyOrder.order.items[0].item);
    }

}