import { Component, ViewChild, AfterViewInit, OnInit } from "@angular/core";
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NewPurchaseEditDialogComponent } from "./new-purchase-edit-dialog/new-purchase-edit-dialog.component";

export interface PeriodicElement {
    itemCode: string;
    itemName: string;
    quantityRemain: string;
    action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { itemCode: 'IC01', itemName: 'item 1', quantityRemain: '100', action: "View" },
    { itemCode: 'IC02', itemName: 'item 2', quantityRemain: '200', action: "View" },
    { itemCode: 'IC03', itemName: 'item 3', quantityRemain: '300', action: "View" },
    { itemCode: 'IC04', itemName: 'item 4', quantityRemain: '400', action: "View" },
    { itemCode: 'IC05', itemName: 'item 5', quantityRemain: '500', action: "View" },
]

@Component({
    selector: 'app-pharmacy-inventory',
    templateUrl: './pharmacy-inventory.component.html',
})

export class PharmacyInventoryComponent implements AfterViewInit, OnInit {

    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */

    showSectionPharmacyInventoryList!: boolean;
    showSectionNewPurchaseEdit!: boolean;
    showSectionItemEdit!: boolean;

    displayedColumns: string[] = ['itemCode', 'itemName', "quantityRemain", "action"];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    /* ************************************* Constructor ******************************************** */
    constructor(
        private dialog: MatDialog) {
    }

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

    public newPurchase(): void {
        this._addEditINewPurchase();
    }

    public openNewPurchaseEditDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
        this.dialog.open(NewPurchaseEditDialogComponent, {
            width: '1200px',
            height: '550px',
            enterAnimationDuration,
            exitAnimationDuration,
        });
    }

    public addItem(): void {
        this._addEditItem();
    }

    public ngOnInit(): void {
        this._init();
    }

    public cancel(): void {
        this._init();
    }

    /* ************************************* Private Methods ******************************************** */
    private _init(): void {
        this._resetSection();
        this.showSectionPharmacyInventoryList = true;
    }

    private _resetSection(): void {
        this.showSectionPharmacyInventoryList = false;
        this.showSectionNewPurchaseEdit = false;
        this.showSectionItemEdit = false;
    }

    private _addEditINewPurchase(): void {
        this._resetSection();
        this.showSectionNewPurchaseEdit = true;
    }

    private _addEditItem(): void {
        this._resetSection();
        this.showSectionItemEdit = true;
    }

}

