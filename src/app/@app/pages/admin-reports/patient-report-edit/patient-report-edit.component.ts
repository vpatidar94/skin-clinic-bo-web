import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PatientDialogDateComponent } from './patient-dialog-date.component';

export interface PeriodicElement {
    date: string;
    patientId: string;
    visitId: string;
    patientName: string;
    department: any;
    doctorName: string;
    referredBy: string;
    amountDeposit: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { date: '01/10/2023', patientId: "001", visitId: "012", patientName: 'Ram Patidar', department: 'Pathology', doctorName: 'Ramesh Mahjan', referredBy: 'Dr. Ram', amountDeposit: '1000' },
    { date: '01/10/2023', patientId: "002", visitId: "012", patientName: 'Rahul Yadav', department: 'USG', doctorName: '-', referredBy: 'Dr. Ram', amountDeposit: '1000' },
    { date: '01/10/2023', patientId: "003", visitId: "012", patientName: 'Keshav Patel', department: 'MRI', doctorName: '-', referredBy: 'Dr. Ram', amountDeposit: '1000' },
    { date: '01/10/2023', patientId: "003", visitId: "012", patientName: 'Tarun Gandhi', department: 'MRI', doctorName: '-', referredBy: 'Dr. Ram', amountDeposit: '1000' },
    { date: '01/10/2023', patientId: "003", visitId: "012", patientName: 'Hitesh Singh', department: 'MRI', doctorName: '-', referredBy: 'Dr. Ram', amountDeposit: '1000' },
    { date: '01/10/2023', patientId: "003", visitId: "012", patientName: 'Yatindra Sahu', department: 'MRI', doctorName: '-', referredBy: 'Dr. Ram', amountDeposit: '1000' },

]

@Component({
    selector: 'app-patient-report-edit',
    templateUrl: './patient-report-edit.component.html',
    styleUrls: ['./patient-report-edit.component.scss'],
})

export class PatientReportEditComponent implements OnInit, AfterViewInit {

    /* ************************************* Static Field ********************************************* */
    /* ************************************* Instance Field ******************************************** */

    displayedColumns: string[] = ['date', 'patientId', 'visitId', 'patientName', "department", 'doctorName', 'referredBy', 'amountDeposit'];
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
        this.dialog.open(PatientDialogDateComponent, {
          width: '500px',
        });
      }
    
      public selectExcel(): void {
      }
    

    /* ************************************* Private Methods ******************************************** */
    private _init(): void {
    }
}