import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-eg-dialog-confirm-proceed',
    templateUrl: 'confirm-proceed-dialog.component.html'
})
export class ConfirmProceedDialogComponent {

    /* ************************************ Static Fields ************************************ */

    /* ************************************ Instance Fields ************************************ */

    /* ************************************ Constructors ************************************ */
    constructor(public dialogRef: MatDialogRef<ConfirmProceedDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }


    /* ************************************ Public Methods ************************************ */

    public onNoClick(): void {
        this.dialogRef.close();
    }


    /* ************************************ Private Methods ************************************ */
}
