import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ApiResponse, ORDER_TX_STATUS, OrderAddTransactionDto, OrderItemVo, OrgPharmacyOrderDto, PharmacyOrderVo, PrescriptionVo, ProductVo } from 'aayam-clinic-core';

//newly added to show table
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxPrintService, PrintOptions } from 'ngx-print';
import { PharmacyApi } from 'src/app/@app/service/remote/pharmacy.api';
import { TransactionApi } from 'src/app/@app/service/remote/transaction.api';
import { ResponseStatusConst } from 'src/app/@shared/const/response-status-const';
import { BillingPrintComponent } from './billing-print/billing-print.component';


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
    dataSource = new MatTableDataSource<OrderItemVo>([] as OrderItemVo[]);

    @Input()
    prescription!: PrescriptionVo[];

    prescriptionMap!: { [key: string]: PrescriptionVo };

    @Input()
    productList!: ProductVo[];

    productMap!: { [key: string]: ProductVo };

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    showChequeInbox: boolean = false;
    showInputFields: boolean = false;

    @Input()
    selectedMedicine!: string[];
    @Output()
    selectedMedicineChange = new EventEmitter<string[]>();

    @Input()
    pharmacyOrder!: OrgPharmacyOrderDto;
    @Output()
    pharmacyOrderChange = new EventEmitter<OrgPharmacyOrderDto>();

    orderTransaction!: OrderAddTransactionDto;
    @Output()
    orderTransactionChange = new EventEmitter<OrderAddTransactionDto>();


    txStatus = ORDER_TX_STATUS;

    newDiscount!: number;


    /* ************************************* Constructors ******************************************** */
    constructor(public dialogRef: MatDialogRef<BillingPrintComponent>,
        private pharmacyApi: PharmacyApi,
        private dialog: MatDialog,
        private transactionApi: TransactionApi,
        private printService: NgxPrintService
    ) {
    }

    /* ************************************* Public Methods ******************************************** */
    public ngOnInit(): void {
        this._init();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['prescription']) {
            this.prescription = changes['prescription'].currentValue;
            if (this.prescription?.length > 0) {
                this.prescriptionMap = {} as { [key: string]: PrescriptionVo };
                this.prescription.forEach((pres: PrescriptionVo) => {
                    this.prescriptionMap[pres.productId] = pres;
                });
            }
        }
        if (changes['productList']) {
            this.prescription = changes['productList'].currentValue;
            if (this.productList?.length > 0) {
                this.productMap = {} as { [key: string]: ProductVo };
                this.productList.forEach((pr: ProductVo) => {
                    this.productMap[pr._id] = pr;
                });
            }
        }
    }

    public onPaymentModeChange(event: Event) {
        const selectElement = event.target as HTMLSelectElement;
        this.showChequeInbox = selectElement.value === 'CHEQUE';
    }


    public updateAmount(row: OrderItemVo | any): void {
        row.amount = ((row.priceBase ?? 0) * (row.qty ?? 0)) - (row.discount ?? 0);
        this.pharmacyOrder.order.discount = this.pharmacyOrder.order.discount ?? 0;
        this.calcAmount();
    }

    public calcAmount(): void {
        let subttotal = 0;
        this.pharmacyOrder.order.items.forEach((oi: OrderItemVo) => {
            subttotal += oi.amount;
        });
        this.pharmacyOrder.order.subTotal = subttotal;
        this.pharmacyOrder.order.totalDue = this.pharmacyOrder.order.subTotal - this.pharmacyOrder.order.discount;
        this.pharmacyOrderChange.emit(this.pharmacyOrder);
    }

    public applyOverallDiscount(): void {
        this.pharmacyOrder.order.totalDue = (this.pharmacyOrder.order.subTotal ?? 0) - (this.pharmacyOrder.order.discount ?? 0);
        this.pharmacyOrderChange.emit(this.pharmacyOrder);
    }

    public getTotalAmount(): number {
        return (this.pharmacyOrder.order.totalDue ?? 0) + (this.pharmacyOrder.order.discount ?? 0);
    }

    public updateOrder(): void {
        this.pharmacyApi.addUpdateOrder(this.pharmacyOrder.order).subscribe((res: ApiResponse<PharmacyOrderVo>) => {
            if (res.body) {
                this.pharmacyOrder.order = res.body;
                this.pharmacyOrderChange.emit(this.pharmacyOrder);
            }
        });
    }

    public deleteRow(row: OrderItemVo, i: number): void {
        let index = i;
        if (!row.openItem && row.item?._id) {
            index = this.pharmacyOrder.order.items?.findIndex(oi => oi.item?._id === row.item?._id);
        }
        this.pharmacyOrder.order.items.splice(index, 1);
        const indexSelectedMedicine = this.selectedMedicine?.findIndex(m => m === row.item?._id);
        if (indexSelectedMedicine >= 0) {
            this.selectedMedicine.splice(indexSelectedMedicine, 1);
            this.selectedMedicineChange.emit(this.selectedMedicine);
        }
        this.calcAmount();
        this._initTable();
        this.updateOrder();
    }

    public addNewRow(): void {
        const oi: OrderItemVo | any = {
            item: null,
            qty: 0,
            note: "",
            status: "",
            taxInclusive: false,
            priceBase: 0,
            tax: 0,
            amount: 0,
            discount: 0,
            igst: 0,
            cgst: 0,
            sgst: 0,
            openItem: true,
            name: "",
            sampleCollectDate: null,
        };
        this.pharmacyOrder.order.items.push(oi);
        this._initTable();
    }

    public isLastRow(i: number): boolean {
        return i === this.pharmacyOrder.order.items.length - 1;
    }

    // public printData(): void {
    //     const printContents = document?.getElementById('pharmacy-receipt-print')?.innerHTML;
    //     const originalContents = document.body.innerHTML;

    //     document.body.innerHTML = printContents ?? '';

    //     window.print();

    //     document.body.innerHTML = originalContents;

    // }

    public printData() {
        const customPrintOptions: PrintOptions = new PrintOptions({
            printSectionId: 'billing-print',
            openNewTab: false,
            useExistingCss: true,
            closeWindow: true,
        });
        this.printService.print(customPrintOptions);
        this.dialogRef.close();
    }

    public payPharmacyBill(): void {
        this.orderTransaction = {} as OrderAddTransactionDto;
        this.orderTransaction.orderId = this.pharmacyOrder.order._id;
        this.orderTransaction.amount = this.pharmacyOrder.order.totalDue - this.pharmacyOrder.order.totalPaid;
        this.transactionApi.addUpdatePharmacyTransaction(this.orderTransaction).subscribe((res: ApiResponse<PharmacyOrderVo>) => {
            if ((res.status === ResponseStatusConst.SUCCESS && res.body)) {
                this.pharmacyOrder.order = res.body;
            }

        });
    }

    /* ************************************* Private Methods ******************************************** */

    private _init(): void {
        this.orderTransaction = {} as OrderAddTransactionDto;
        this.orderTransaction.orderId = this.pharmacyOrder.order._id;
        this.orderTransaction.amount = this.pharmacyOrder.order.totalDue - this.pharmacyOrder.order.totalPaid
        this.orderTransactionChange.emit(this.orderTransaction);
        this._initTable();
    }

    private _initTable() {
        this.dataSource = new MatTableDataSource(this.pharmacyOrder.order.items);
    }

}