import { Component, ViewChild, AfterViewInit, OnInit, TemplateRef } from "@angular/core";
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

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
    // styleUrls: ['./inventory.component.scss']
})

export class PharmacyInventoryComponent implements AfterViewInit, OnInit {

    @ViewChild('callAPIDialog') callAPIDialog!: TemplateRef<any>;

    showSectionPharmacyInventoryList!: boolean;
    showSectionNewPurchaseEdit!: boolean;
    showSectionItemEdit!: boolean;

    displayedColumns: string[] = ['itemCode', 'itemName', "quantityRemain", "action"];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private dialog: MatDialog) {
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

    public newPurchase():void {
        this._addEditINewPurchase();
        let dialogRef = this.dialog.open(this.callAPIDialog);
        dialogRef.afterClosed().subscribe(result => {
          // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
          if (result !== undefined) {
            if (result === 'yes') {
              // TODO: Replace the following line with your code.
              console.log('User clicked yes.');
            } else if (result === 'no') {
              // TODO: Replace the following line with your code.
              console.log('User clicked no.');
            }
        }
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

