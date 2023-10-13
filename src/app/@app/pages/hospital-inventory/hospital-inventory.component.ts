import { Component, ViewChild, AfterViewInit, OnInit } from "@angular/core";
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HospitalInventoryItemEditComponent } from "./hospital-inventory-item-edit/hospital-inventory-item-edit.component";
import { MatDialog } from "@angular/material/dialog";

export interface PeriodicElement {
  sNo: number;
  itemCode: string;
  itemName: string;
  quantityRemain: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { sNo: 1, itemCode: 'IC01', itemName: 'item 1', quantityRemain: '100', action: "View" },
  { sNo: 2, itemCode: 'IC02', itemName: 'item 2', quantityRemain: '200', action: "View" },
  { sNo: 3, itemCode: 'IC03', itemName: 'item 3', quantityRemain: '300', action: "View" },
  { sNo: 4, itemCode: 'IC04', itemName: 'item 4', quantityRemain: '400', action: "View" },
  { sNo: 5, itemCode: 'IC05', itemName: 'item 5', quantityRemain: '500', action: "View" },
]

@Component({
  selector: 'app-hospital-inventory',
  templateUrl: './hospital-inventory.component.html',
  // styleUrls: ['./inventory.component.scss']
})

export class HospitalInventoryComponent implements AfterViewInit, OnInit {

  /* ********************************* Static Field *************************************** */
  /* *********************************** Instance Field *********************************** */

  showSectionInventoryList!: boolean;
  showSectionInventoryEdit!: boolean;
  showSectionItemEdit!: boolean;

  displayedColumns: string[] = ['sNo', 'itemCode', 'itemName', "quantityRemain", "action"];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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

  public addInventory(): void {
    this._addEditServiceItem();
  }

  public ngOnInit(): void {

    this._init();
  }

  public cancel(): void {
    this._init();
  }

  public openHospitalInventoryItemEditDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(HospitalInventoryItemEditComponent, {
      width: '1000px',
      height: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  /* ************************************* Private Methods ******************************************** */
  private _init(): void {
    this._resetSection();
    this.showSectionInventoryList = true;
  }

  private _resetSection(): void {
    this.showSectionInventoryList = false;
    this.showSectionInventoryEdit = false;
    this.showSectionItemEdit = false;
  }

  private _addEditServiceItem(): void {
    this._resetSection();
    this.showSectionInventoryEdit = true;
  }

}

