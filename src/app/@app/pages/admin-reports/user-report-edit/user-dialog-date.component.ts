import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-user-dialog-date',
    templateUrl: 'user-dialog-date.component.html',
    // styleUrls: ['user-dialog-date.component.scss']
})
export class UserDialogDateComponent {

    /* ************************************ Static Fields ************************************ */
    /* ************************************ Instance Fields ************************************ */
    selectedFromDate!: Date | null;
    selectedToDate!: Date | null;

    /* ************************************ Constructors ************************************ */
    constructor(public dialogRef: MatDialogRef<UserDialogDateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    /* ************************************ Public Methods ************************************ */
    public onNoClick(): void {
        this.dialogRef.close();
    }

    /* ************************************ Private Methods ************************************ */
}
