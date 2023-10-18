import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  userId: string;
  userName: string;
  department: string;
  joiningDate: string;
  attendance: string;
  grossSalary: string;
  netSalary: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { userId: '01245', userName: 'Ram Patidar', department: 'Pathology', joiningDate: '01/10/2023', attendance: 'Dr. Ram', grossSalary: '2000', netSalary: '5000' },
  { userId: '01245', userName: 'Rahul Yadav', department: 'USG', joiningDate: '01/10/2023', attendance: 'Dr. Ram', grossSalary: '2000', netSalary: '5000' },
  { userId: '01245', userName: 'Keshav Patel', department: 'MRI', joiningDate: '01/10/2023', attendance: 'Dr. Ram', grossSalary: '2000', netSalary: '5000' },
  { userId: '01245', userName: 'Tarun Gandhi', department: 'MRI', joiningDate: '01/10/2023', attendance: 'Dr. Ram', grossSalary: '2000', netSalary: '5000' },
  { userId: '01245', userName: 'Hitesh Singh', department: 'MRI', joiningDate: '01/10/2023', attendance: 'Dr. Ram', grossSalary: '2000', netSalary: '5000' },
  { userId: '01245', userName: 'Yatindra Sahu', department: 'MRI', joiningDate: '01/10/2023', attendance: 'Dr. Ram', grossSalary: '2000', netSalary: '5000' },

]

@Component({
  selector: 'app-user-report-edit',
  templateUrl: './user-report-edit.component.html',
  styleUrls: ['./user-report-edit.component.scss'],
})

export class UserReportEditComponent implements OnInit, AfterViewInit {

  /* ************************************* Static Field ********************************************* */
  /* ************************************* Instance Field ******************************************** */

  displayedColumns: string[] = ['userId', 'userName', "department", 'joiningDate', 'attendance', 'grossSalary', 'netSalary'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  showCustomDateInput: boolean = false;

  /* ************************************* Constructors ******************************************** */
  constructor() { }

  /* ************************************* Public Methods ******************************************** */

  public ngAfterViewInit() {
    this.paginator.showFirstLastButtons = false;
    this.paginator.hidePageSize = false;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public addInvestigation(): void {
    this._addEditServiceItem();
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
  }

  /* ************************************* Private Methods ******************************************** */
  private _init(): void {
    this._resetSection();
    // this.showSectionInvestigationList = true;
  }

  private _resetSection(): void {
    // this.showSectionInvestigationList = false;
    // this.showSectionInvestigationEdit = false;
  }

  private _addEditServiceItem(): void {
    this._resetSection();
    // this.showSectionInvestigationEdit = true;
  }

}
