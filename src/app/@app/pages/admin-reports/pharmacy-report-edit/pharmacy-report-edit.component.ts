import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PharmacyDialogDateComponent } from './pharmacy-dialog-date.component';

export interface PeriodicElement {
    date: string;
    billNo: string;
    patientId: string;
    patientName: string;
    department: any;
    amount: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { date: '01/10/2023', billNo: '012', patientId: "001", patientName: 'Ram Patidar', department: 'Pathology', amount: '1000' },
    { date: '01/10/2023', billNo: '012', patientId: "002", patientName: 'Rahul Yadav', department: 'USG', amount: '1000' },
    { date: '01/10/2023', billNo: '012', patientId: "003", patientName: 'Keshav Patel', department: 'MRI', amount: '1000' },
    { date: '01/10/2023', billNo: '012', patientId: "003", patientName: 'Tarun Gandhi', department: 'MRI', amount: '1000' },
    { date: '01/10/2023', billNo: '012', patientId: "003", patientName: 'Hitesh Singh', department: 'MRI', amount: '1000' },
    { date: '01/10/2023', billNo: '012', patientId: "003", patientName: 'Yatindra Sahu', department: 'MRI', amount: '1000' },

]

@Component({
    selector: 'app-pharmacy-report-edit',
    templateUrl: './pharmacy-report-edit.component.html',
    styleUrls: ['./pharmacy-report-edit.component.scss'],
})

export class PharmacyReportEditComponent implements OnInit, AfterViewInit {

    /* ************************************* Static Field ********************************************* */
    /* ************************************* Instance Field ******************************************** */

    displayedColumns: string[] = ['date', 'billNo', 'patientId', 'patientName', "department", 'amount'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    showCustomDateInput: boolean = false;
    
    selectTabValue!: string;
    selectedFromDate!: Date | null;
    selectedToDate!: Date | null;
  
    /* ************************************* Constructors ******************************************** */
    constructor(private dialog: MatDialog) { }

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
        this._init();
    }

    public cancel(): void {
        this._init();
    }

    public onReportSelectChange(event: Event) {
        const selectElement = event.target as HTMLSelectElement;
        this.showCustomDateInput = selectElement.value === 'CUSTOM';
        if (this.showCustomDateInput) {
          this._showCalenderPopup();
        }
      }
    
      public _showCalenderPopup(): void {
        this.dialog.open(PharmacyDialogDateComponent, {
          width: '400px',
        });
      }
    
      public selectExcel(): void {
      }

    /* ************************************* Private Methods ******************************************** */
    private _init(): void {
    }
}
