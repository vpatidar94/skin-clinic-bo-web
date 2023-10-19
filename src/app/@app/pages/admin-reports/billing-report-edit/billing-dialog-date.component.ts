import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-billing-dialog-date',
    templateUrl: 'billing-dialog-date.component.html',
    // styleUrls: ['billing-dialog-date.component.scss']
})
export class BillingDialogDateComponent {

    /* ************************************ Static Fields ************************************ */
    /* ************************************ Instance Fields ************************************ */
    selectedFromDate!: Date | null;
    selectedToDate!: Date | null;

    /* ************************************ Constructors ************************************ */
    constructor(public dialogRef: MatDialogRef<BillingDialogDateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    /* ************************************ Public Methods ************************************ */
    public onNoClick(): void {
        this.dialogRef.close();
    }

    /* ************************************ Private Methods ************************************ */
}
