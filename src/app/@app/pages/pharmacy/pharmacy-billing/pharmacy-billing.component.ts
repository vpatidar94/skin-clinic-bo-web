
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
    patientId: number;
    patientName: string;
    contact: string;
    date: string;
    doctorsName: string;
    action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { patientId: 1101, patientName: 'Chhitu Yadav', contact: '7898454503', date: '02/08/22023', doctorsName: 'Dr.Mayank Patidar', action: "View" },
    { patientId: 1202, patientName: 'Virat kohli', contact: '86566546544', date: '02/08/22023', doctorsName: 'Dr.Mayank Patidar', action: "View" },
    { patientId: 3625, patientName: 'Rohit Sharma', contact: '654498498554', date: '02/08/22023', doctorsName: 'Dr.Mayank Patidar', action: "View" },
    { patientId: 1464, patientName: 'Hardik Pandya', contact: '656484654555', date: '02/08/22023', doctorsName: 'Dr.Mayank Patidar', action: "View" },
    { patientId: 8555, patientName: 'AB de Villiers', contact: '371648984588', date: '02/08/22023', doctorsName: 'Dr.Mayank Patidar', action: "View" },
]

@Component({
         selector: 'app-pharmacy-billing',
         templateUrl: './pharmacy-billing.component.html',
         styleUrls: ['./pharmacy-billing.component.scss']
     })

export class PharmacyBillingComponent implements OnInit {
    displayedColumns: string[] = ['patientId', 'patientName', 'contact', "date", 'doctorsName', "action"];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    showSectionPharmacyBillingList: boolean = false;
    showSectionPharmacyEdit: boolean = false;

    /* ************************************* Constructors ******************************************** */
    constructor() {

    }

    /* ************************************* Public Methods ******************************************** */
    public ngOnInit(): void {
        this._init();
      }
    
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


    public addNewCustomer(): void{
        this._resetSection();
        this.showSectionPharmacyEdit = true;
    }

    public cancel(): void {
        this._init();
      }

     /* ************************************ Private Methods ************************************ */
     private _init(): void {
        this._resetSection();
        this.showSectionPharmacyBillingList = true;
        
    
      }

     private _resetSection(): void {
        this.showSectionPharmacyBillingList = false;
        this.showSectionPharmacyEdit = false;
      }
}
