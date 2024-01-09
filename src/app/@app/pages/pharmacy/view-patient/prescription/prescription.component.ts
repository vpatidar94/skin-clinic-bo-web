import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PrescriptionVo, BookingVo, UserBookingDto, OrgPharmacyOrderDto } from 'aayam-clinic-core';
import { UiActionDto } from 'src/app/@shared/dto/ui-action.dto';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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

export class PrescriptionComponent{

    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */

    displayedColumns: string[] = ['sno', 'medicine', 'dosage', "duration", "select"];
    // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    dataSource = new MatTableDataSource< OrgPharmacyOrderDto>([] as OrgPharmacyOrderDto[]);


    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    @Input()
    prescription!: OrgPharmacyOrderDto[];

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

    public applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

}