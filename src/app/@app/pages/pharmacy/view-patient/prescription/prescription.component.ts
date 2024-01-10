import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PrescriptionVo, BookingVo, UserBookingDto, OrgPharmacyOrderDto, ProductVo, OrderItemVo, BookingUtility, DosageUtility } from 'aayam-clinic-core';
import { UiActionDto } from 'src/app/@shared/dto/ui-action.dto';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatCheckboxChange } from '@angular/material/checkbox';

export interface PeriodicElement {
    sno: number;
    medicine: string;
    dosage: string;
    duration: string;
    select: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { sno: 1, medicine: 'Tab Acifin p 500mg', dosage: 'BD', duration: '5 days', select: "View" },
    // { sno: 2, medicine: 'Tab Azee 500mg', dosage: 'OD', duration: '2 days', select: "View" },
    // { sno: 3, medicine: 'Sy Cherycof', dosage: 'OD', duration: '5 days', select: "View" },
    // { sno: 4, medicine: 'Tab Azithromycin 650mg', dosage: 'OD', duration: '15 days', select: "View" },
]

@Component({
    selector: 'app-prescription',
    templateUrl: './prescription.component.html',
    styleUrls: ['./prescription.component.scss']
})

export class PrescriptionComponent {

    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */

    displayedColumns: string[] = ['sno', 'medicine', 'dosage', "duration", "select"];
    // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    dataSource = new MatTableDataSource<PrescriptionVo>([] as PrescriptionVo[]);


    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    @Input()
    prescription!: PrescriptionVo[];

    @Input()
    selectedMedicine!: string[];
    @Output()
    selectedMedicineChange = new EventEmitter<string[]>();

    @Input()
    pharmacyOrder!: OrgPharmacyOrderDto;
    @Output()
    pharmacyOrderChange = new EventEmitter<OrgPharmacyOrderDto>();

    @Input()
    productList!: ProductVo[];

    /* ************************************* Constructors ******************************************** */
    constructor() {

    }

    /* ************************************* Public Methods ******************************************** */
    public ngAfterViewInit() {
        this.paginator.showFirstLastButtons = false;
        this.paginator.hidePageSize = false;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource = new MatTableDataSource(this.prescription);
    }

    public medicineSelected(e: MatCheckboxChange, productId: string): void {
        if (e.checked) {
            this.selectedMedicine.push(productId);
        } else {
            const i = this.selectedMedicine.findIndex(it => it === productId);
            if (i >= 0) { 
                this.selectedMedicine.splice(i, 1);
            }
        }
        this.selectedMedicine = [...new Set(this.selectedMedicine)];
        this.selectedMedicineChange.emit(this.selectedMedicine);
    }

    public applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    public addMedicineToBilling(): void {
        if (this.prescription?.length > 0) {
            this.pharmacyOrder.order.items = [] as OrderItemVo[];
            this.pharmacyOrderChange.emit(this.pharmacyOrder);
            this.prescription.forEach((pres: PrescriptionVo, i: number) => {
                if (this.selectedMedicine.includes(pres.productId)) {
                    const item = this.productList?.find((item) => item._id === pres.productId) as ProductVo;
                    if (item?._id) {
                        const oi = {} as OrderItemVo;
                        oi.item = item;
                        oi.item = JSON.parse(JSON.stringify(item)) as ProductVo;
                        oi.priceBase = item.price;
                        oi.qty = DosageUtility.getQty(pres.duration, pres.dosage);
                        oi.name = item.name;
                        this.pharmacyOrder.order.items.push(oi);
                        BookingUtility.updateBookingItemAndCalcTotalPharmacy(true, this.pharmacyOrder.order, item, oi.qty, '');
                    }
                }
            });
            this.pharmacyOrderChange.emit(this.pharmacyOrder);
        }
    }

}