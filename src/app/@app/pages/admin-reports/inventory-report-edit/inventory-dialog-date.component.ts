import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';


@Component({
    selector: 'app-inventory-dialog-date',
    templateUrl: 'inventory-dialog-date.component.html',
    styleUrls: ['inventory-dialog-date.component.scss']
})
export class InventoryDialogDateComponent {

    /* ************************************ Static Fields ************************************ */
    /* ************************************ Instance Fields ************************************ */
    isPdfLoaded: boolean = false;
    private pdf!: PDFDocumentProxy;

    selectedFromDate!: Date | null;
    selectedToDate!: Date | null;

    /* ************************************ Constructors ************************************ */
    constructor(public dialogRef: MatDialogRef<InventoryDialogDateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    /* ************************************ Public Methods ************************************ */
    public onNoClick(): void {
        this.dialogRef.close();
    }

    /* ************************************ Private Methods ************************************ */
}
