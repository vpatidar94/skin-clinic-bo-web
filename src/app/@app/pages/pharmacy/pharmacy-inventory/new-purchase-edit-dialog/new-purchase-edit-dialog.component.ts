import { Component, Input, OnInit, } from '@angular/core';
import { ProductVo } from 'aayam-clinic-core';
import { MatDialog } from '@angular/material/dialog';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';

export interface NewPurchaseInterface {
    sNo: string,
    itemName: string,
    company: string,
    batchNo: string,
    qty: string,
    expiry: string,
}

@Component({
    selector: 'app-new-purchase-edit-dialog',
    templateUrl: './new-purchase-edit-dialog.component.html',
})
export class NewPurchaseEditDialogComponent implements OnInit {
    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */
    newPurchaseData = [{
        sNo: '',
        itemName: '',
        company: '',
        batchNo: '',
        qty: '',
        expiry: '',
    }];

    newPurchase!: Array<NewPurchaseInterface>

    isPanelOpen:boolean = true;


    /* ************************************* Constructors ******************************************** */
    constructor(private dialog: MatDialog) { }

    /* ************************************* Public Methods ******************************************** */
    public ngOnInit(): void {
        this.newPurchase = (this.newPurchaseData as Array<NewPurchaseInterface>);
    }

    public openAddProductDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
        this.dialog.open(AddProductDialogComponent, {
            width: '1900px',
            height: '550px',
            enterAnimationDuration,
            exitAnimationDuration,
        });
    }

    public removeTestParameter(index: number): void {
        this.newPurchase.splice(index, 1);
    }

    public addTestParameter() {
        this.newPurchase.push({
            sNo: '',
            itemName: '',
            company: '',
            batchNo: '',
            qty: '',
            expiry: '',
        });
    }


  panelOpened() {
    this.isPanelOpen = false;
  }

  panelClosed() {
    this.isPanelOpen = true;
  }

    /* ************************************* Private Methods ******************************************** */

}