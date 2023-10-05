import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

//newly added to show table
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

// newly added to show table
export interface PeriodicElement {
    billNo: number;
    patientName: string;
    contactNo: string;
    date: string;
    doctorsName: string;
    action: string;
}

// newly added to show table
const ELEMENT_DATA: PeriodicElement[] = [
    { billNo: 1101, patientName: 'Chhitu Yadav', contactNo: '7894561230', date: '02/08/22023', doctorsName: 'Dr.Mayank Patidar', action: "View | move to pharmacy" },
    { billNo: 1202, patientName: 'Virat kohli', contactNo: '6544000000', date: '02/08/22023', doctorsName: 'Dr.Mayank Patidar', action: "View | move to pharmacy" },
    { billNo: 3625, patientName: 'Rohit Sharma', contactNo: '8554000000', date: '02/08/22023', doctorsName: 'Dr.Mayank Patidar', action: "View | move to pharmacy" },
    { billNo: 1464, patientName: 'Hardik Pandya', contactNo: '4555000000', date: '02/08/22023', doctorsName: 'Dr.Mayank Patidar', action: "View | move to pharmacy" },
    { billNo: 8555, patientName: 'AB de Villiers', contactNo: '3788000000', date: '02/08/22023', doctorsName: 'Dr.Mayank Patidar', action: "View | move to pharmacy" },
]

@Component({
    selector: 'app-pharmacy-billing',
    templateUrl: './pharmacy-billing.component.html',
    styleUrls: ['./pharmacy-billing.component.scss']
})
export class PharmacyBillingComponent {
    // newly added to show table
    showPharmacyEditForm: boolean = false;
    // displayedColumns: string[] = ['patientId', 'patientName', 'billNo', "date", 'doctorsName', "action"];
    
    // newly added
    displayedColumns: string[] = ['billNo', 'patientName', 'contactNo', "date", 'doctorsName', "action"];
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

    addNewCustomer(): void{
        this.showPharmacyEditForm = !this.showPharmacyEditForm;
    }
}
