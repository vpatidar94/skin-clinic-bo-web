import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { MatDialog } from '@angular/material/dialog';
import { TestIdBarCodeDialogComponent } from '../test-id-bar-code-dialog/test-id-bar-code-dialog.component';
import { PatientIdBarCodeDialogComponent } from '../patient-id-bar-code-dialog/patient-id-bar-code-dialog.component';

export interface PeriodicElement {
    sno: number;
    investigationName: string;
    specimen: string;
    sampleCollected: boolean;
    sampleDate: Date;
    time: string;
    action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { sno: 1, investigationName: 'CBC', specimen: 'Blood', sampleCollected: false, sampleDate: new Date(), time: '12:30 PM', action: 'Print' },
    { sno: 2, investigationName: 'Widal Test', specimen: 'Blood', sampleCollected: false, sampleDate: new Date(), time: '12:30 PM', action: 'Print' },
    { sno: 3, investigationName: 'Lipid Profile', specimen: 'Blood', sampleCollected: false, sampleDate: new Date(), time: '12:30 PM', action: 'Print' },
]

@Component({
    selector: 'app-test-sample-details',
    templateUrl: './test-sample-details.component.html',
    styleUrls: ['./test-sample-details.component.scss']
})

export class TestSampleDetailsComponent {
    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */
    displayedColumns: string[] = ['sno', 'investigationName', 'specimen', "sampleCollected", 'sampleDate', 'time', 'action'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    showTestIdBarcode: boolean = false;
    showPatientIdBarcode: boolean = false;

    /* ************************************* Constructors ******************************************** */
    constructor(public dialog: MatDialog
    ) { }

    /* ************************************* Public Methods ******************************************** */
    public ngAfterViewInit() {
        this.paginator.showFirstLastButtons = false;
        this.paginator.hidePageSize = false;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    public applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    public openDialogPatientId(enterAnimationDuration: string, exitAnimationDuration: string): void {
        this.dialog.open(PatientIdBarCodeDialogComponent, {
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
}