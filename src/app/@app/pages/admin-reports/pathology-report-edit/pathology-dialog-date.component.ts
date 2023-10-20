import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-pathology-dialog-date',
    templateUrl: 'pathology-dialog-date.component.html',
    styleUrls: ['pathology-dialog-date.component.scss']
})
export class PathologyDialogDateComponent {

    /* ************************************ Static Fields ************************************ */
    /* ************************************ Instance Fields ************************************ */
    selectedFromDate!: Date | null;
    selectedToDate!: Date | null;

    /* ************************************ Constructors ************************************ */
    constructor(public dialogRef: MatDialogRef<PathologyDialogDateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    /* ************************************ Public Methods ************************************ */
    public onNoClick(): void {
        this.dialogRef.close();
    }

    /* ************************************ Private Methods ************************************ */
}
