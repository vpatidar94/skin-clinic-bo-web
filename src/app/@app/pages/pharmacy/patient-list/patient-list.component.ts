import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';



//newly added to show table
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

// newly added to show table
export interface PeriodicElement {
    patientId: number;
    patientName: string;
    contact: string;
    date: string;
    doctorsName: string;
    action: string;
}

// newly added to show table
const ELEMENT_DATA: PeriodicElement[] = [
    { patientId: 1101, patientName: 'Chhitu Yadav', contact: '7898454503', date: '02/08/22023', doctorsName: 'Dr.Mayank Patidar', action: "View" },
    { patientId: 1202, patientName: 'Virat kohli', contact: '86566546544', date: '02/08/22023', doctorsName: 'Dr.Mayank Patidar', action: "View" },
    { patientId: 3625, patientName: 'Rohit Sharma', contact: '654498498554', date: '02/08/22023', doctorsName: 'Dr.Mayank Patidar', action: "View" },
    { patientId: 1464, patientName: 'Hardik Pandya', contact: '656484654555', date: '02/08/22023', doctorsName: 'Dr.Mayank Patidar', action: "View" },
    { patientId: 8555, patientName: 'AB de Villiers', contact: '371648984588', date: '02/08/22023', doctorsName: 'Dr.Mayank Patidar', action: "View" },
]


@Component({
    selector: 'app-patient-list',
    templateUrl: './patient-list.component.html',
    styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent {
    // newly added to show table
    displayedColumns: string[] = ['patientId', 'patientName', 'contact', "date", 'doctorsName', "action"];
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
}
