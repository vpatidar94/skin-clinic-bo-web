import { Component, Input, } from '@angular/core';
import { ProductVo } from 'aayam-clinic-core';
import { MatDialog } from '@angular/material/dialog';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';

@Component({
    selector: 'app-new-purchase-edit-dialog',
    templateUrl: './new-purchase-edit-dialog.component.html',
})
export class NewPurchaseEditDialogComponent {
    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */
    
    /* ************************************* Constructors ******************************************** */
    constructor(private dialog: MatDialog) { }

    /* ************************************* Public Methods ******************************************** */
    public openAddProductDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
        this.dialog.open(AddProductDialogComponent, {
            width: '1900px',
            height: '550px',
            enterAnimationDuration,
            exitAnimationDuration,
        });
    }
    /* ************************************* Private Methods ******************************************** */

}