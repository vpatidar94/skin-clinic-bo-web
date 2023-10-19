import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InventoryDialogDateComponent } from './inventory-dialog-date.component';
import { MatDialog } from '@angular/material/dialog';

export interface PeriodicElement {
  date: string;
  itemCode: string;
  itemName: string;
  issuedQty: string;
  issuerName: string;
  issuedTo: string;
  department: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { date: '01/10/2023', itemCode: "001", itemName: 'item-1', issuedQty: '2', issuerName: 'Ram Patidar', issuedTo: 'Dr. Ram', department: 'O.T' },
  { date: '01/10/2023', itemCode: "002", itemName: 'item-2', issuedQty: '3', issuerName: 'Keshav Sharma', issuedTo: 'Dr. Pulkit', department: 'Pharmacy' },
  { date: '01/10/2023', itemCode: "003", itemName: 'item-3', issuedQty: '5', issuerName: 'Ravi Mishra', issuedTo: 'Dr. Raghav', department: 'Pathology' },
  { date: '01/10/2023', itemCode: "003", itemName: 'item-4', issuedQty: '3', issuerName: 'Harish Jatav', issuedTo: 'Dr. Shyam', department: 'O.T' },
  { date: '01/10/2023', itemCode: "003", itemName: 'item-5', issuedQty: '6', issuerName: 'Garima Prasad', issuedTo: 'Dr. Vikram', department: 'Surgery' },
  { date: '01/10/2023', itemCode: "003", itemName: 'item-6', issuedQty: '3', issuerName: 'Himanshu Sinha', issuedTo: 'Dr. Ravi', department: 'Skin' },

]

const ELEMENT_DATA_2: PeriodicElement[] = [
  { date: '01/10/2023', itemCode: "001", itemName: 'item-1', issuedQty: '2', issuerName: 'Ram Patidar', issuedTo: 'Dr. Ram', department: 'O.T' },
  { date: '01/10/2023', itemCode: "002", itemName: 'item-2', issuedQty: '3', issuerName: 'Keshav Sharma', issuedTo: 'Dr. Pulkit', department: 'Pharmacy' },
  { date: '01/10/2023', itemCode: "003", itemName: 'item-3', issuedQty: '5', issuerName: 'Ravi Mishra', issuedTo: 'Dr. Raghav', department: 'Pathology' },
  { date: '01/10/2023', itemCode: "003", itemName: 'item-4', issuedQty: '3', issuerName: 'Harish Jatav', issuedTo: 'Dr. Shyam', department: 'O.T' },
  { date: '01/10/2023', itemCode: "003", itemName: 'item-5', issuedQty: '6', issuerName: 'Garima Prasad', issuedTo: 'Dr. Vikram', department: 'Surgery' },
  { date: '01/10/2023', itemCode: "003", itemName: 'item-6', issuedQty: '3', issuerName: 'Himanshu Sinha', issuedTo: 'Dr. Ravi', department: 'Skin' },

]



@Component({
  selector: 'app-inventory-report-edit',
  templateUrl: './inventory-report-edit.component.html',
  styleUrls: ['./inventory-report-edit.component.scss'],
})

export class InventoryReportEditComponent implements OnInit, AfterViewInit {

  /* ************************************* Static Field ********************************************* */
  /* ************************************* Instance Field ******************************************** */

  displayedColumns: string[] = ['date', 'itemCode', 'itemName', "issuedQty", 'issuerName', 'issuedTo', 'department'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns_2: string[] = ['date', 'itemCode', 'itemName', "issuedQty", 'issuerName', 'issuedTo', 'department'];
  dataSource_2 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA_2);

  showCustomDateInput: boolean = false;

  showSectionHospitalInventory: boolean = false;
  showSectionPharmacyInventory: boolean = false;
  tabValue!: string;
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

  public tabChange(): void {
    this._tabChange(this.tabValue);
  }

  public _showCalenderPopup(): void {
    this.dialog.open(InventoryDialogDateComponent, {
      width: '400px',
    });
  }

  public selectExcel(): void {
  }


  /* ************************************* Private Methods ******************************************** */
  private _init(): void {
    this.tabValue = 'USERPROFILE'
    this.tabChange();
    this.showSectionHospitalInventory = true;
  }

  private _resetSection(): void {
    this.showSectionHospitalInventory = false;
    this.showSectionPharmacyInventory = false;
  }

  private _tabChange(tabValue: string): void {
    switch (tabValue) {
      case 'HOSPITALINVENTORY':
        this._resetSection();
        this.showSectionHospitalInventory = true;
        console.log(",,,,,,,,,,", this.showSectionHospitalInventory, this.showSectionPharmacyInventory)
        break;
      case 'PHARMACYINVENTORY':
        this._resetSection();
        this.showSectionPharmacyInventory = true;
        break;
    }
  }
}
