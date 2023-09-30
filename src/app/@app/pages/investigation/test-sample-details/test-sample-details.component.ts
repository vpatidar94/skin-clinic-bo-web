import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PrescriptionVo, BookingVo, UserBookingDto } from 'aayam-clinic-core';
import { UiActionDto } from 'src/app/@shared/dto/ui-action.dto';

//newly added to show table
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

// newly added to show table
export interface PeriodicElement {
    sno: number;
    investigationName: string;
    specimen: string;
    sampleCollected: string;
    date: string;
    time: string;
}

// newly added to show table
const ELEMENT_DATA: PeriodicElement[] = [
    { sno: 1, investigationName: 'CBC', specimen: 'Blood', sampleCollected: "View", date: '09/09/2023', time: '12:30 PM' },
    { sno: 2, investigationName: 'Widal Test', specimen: 'Blood', sampleCollected: "View", date: '09/09/2023', time: '12:30 PM' },
    { sno: 3, investigationName: 'Lipid Profile', specimen: 'Blood', sampleCollected: "View", date: '09/09/2023', time: '12:30 PM' },

]
@Component({
    selector: 'app-test-sample-details',
    templateUrl: './test-sample-details.component.html',
    // styleUrls: ['./test-sample-details.component.scss']
})
export class TestSampleDetailsComponent {
    displayedColumns: string[] = ['sno', 'investigationName', 'specimen', "sampleCollected", 'date', 'time'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    /* ************************************* Constructors ******************************************** */
    constructor() {

    }

    /* ************************************* Public Methods ******************************************** */
    // newly added to show table
    public ngAfterViewInit() {
        this.paginator.showFirstLastButtons = false;
        this.paginator.hidePageSize = false;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    // newly added to show table
    public applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    /* ********************************* Static Field *************************************** */

}