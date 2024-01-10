import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


export interface PeriodicElement {
    menu: string;
    pages: Array<string>;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { menu: 'Add patient', pages: ['List', 'New patient', 'Service'] },

    { menu: 'New Appointment', pages: ['List', 'Add appointment'] },

    { menu: 'Hospital Inventory', pages: ['List'] },

    { menu: 'Investigation', pages: ['List', 'Test samples', 'Reports'] },

    { menu: 'Users', pages: ['List', 'User Profile', 'Account/Salary', 'User Login', 'Attendance'] },

    // Master menus and pages
    { menu: 'Services', pages: ['List', 'Add Service'] },
    { menu: 'Service Type', pages: ['List', 'Service Type'] },
    { menu: 'Product', pages: ['List', 'Add Product'] },
    { menu: 'Department', pages: ['List', 'Add Department'] },
    { menu: 'User Type', pages: ['List', 'User Type'] },
    { menu: 'Investigation', pages: ['List', 'Add Investigation'] },

    // Pharmacy menus and pages

    { menu: 'Pharmacy Billing', pages: ['List', 'Add New Customer'] },
    { menu: 'Patient List', pages: ['List'] },
    { menu: 'Pharmacy Inventory', pages: ['List', 'New Purchase'] },
]

@Component({
    selector: 'app-user-permissions',
    templateUrl: './user-permissions.component.html',
    styleUrls: ['./user-permissions.component.scss']
})

export class UserPermissionsComponent implements OnInit, AfterViewInit {
    /* ************************************* Instance Field ******************************************** */
    /* ************************************* Static Field ******************************************** */
    displayedColumns: string[] = ['menu', 'pages'];

    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    /* ************************************* Constructor ******************************************** */
    constructor(
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

    public ngOnInit(): void {
    }

    /* ************************************* Private Methods ******************************************** */

}