import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
    selector: 'app-eg-dialog-confirm-delete',
    templateUrl: 'confirm-delete-dialog.component.html'
})
export class ConfirmDeleteDialogComponent {

    /* ************************************ Static Fields ************************************ */

    /* ************************************ Instance Fields ************************************ */

    /* ************************************ Constructors ************************************ */
    constructor(public dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }


    /* ************************************ Public Methods ************************************ */

    public onNoClick(): void {
        this.dialogRef.close();
    }

    /* ************************************ Private Methods ************************************ */
}
