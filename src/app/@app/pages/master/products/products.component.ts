import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AddressVo, ApiResponse, BookingVo, ItemDetailDto, KeyValueVo, ObservationVo, PrescriptionVo, ResponseStatus, UserBookingDto, UserVo } from 'aayam-clinic-core';
import { AuthService } from 'src/app/@shared/security/auth.service';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';

//newly added to show table
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

// newly added to show table
export interface PeriodicElement {
    ProductCode: number;
    ProductName: string;
    ProductType: string;
    Price: string;
    Action: string;
}

// newly added to show table
const ELEMENT_DATA: PeriodicElement[] = [
    { ProductCode: 1, ProductName: 'OPD', ProductType: 'OPD', Price: '1120', Action: "Edit | Delete" },
    { ProductCode: 2, ProductName: 'Dressing', ProductType: 'Dressing', Price: '1120', Action: "Edit | Delete" },
    { ProductCode: 3, ProductName: 'Blood Test', ProductType: '', Price: '11:20', Action: "Edit | Delete" },
    { ProductCode: 4, ProductName: '', ProductType: '', Price: '1110', Action: "Edit | Delete" },
    { ProductCode: 5, ProductName: '', ProductType: 'z', Price: '1100', Action: "Edit | Delete" },
    { ProductCode: 6, ProductName: '', ProductType: '', Price: '120', Action: "Edit | Delete" },
    { ProductCode: 7, ProductName: '', ProductType: 'kat', Price: '100', Action: "Edit | Delete" },
]
@Component({
    selector: 'app-products',
    styleUrls: ['./products.component.scss'],
    templateUrl: './products.component.html',
})

export class ProductsComponent implements AfterViewInit {

    /* ************************************* Static Field ********************************************* */
    /* ************************************* Instance Field ******************************************** */
    showAddProductsSection: boolean = false;
    toggleAddProductsSection() {
        console.log('Toggle function called');
        this.showAddProductsSection = !this.showAddProductsSection;
    }

    // newly added to show table
    displayedColumns: string[] = ['Product Code', 'Product Name', 'Product Type', "Price", "Action"];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    /* ************************************* Constructors ******************************************** */
    constructor() { }

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

    /* ************************************* Private Methods ******************************************** */



}
