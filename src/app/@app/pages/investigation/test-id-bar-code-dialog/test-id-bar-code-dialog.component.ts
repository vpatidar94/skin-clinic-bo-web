import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-test-id-bar-code-dialog',
    templateUrl: 'test-id-bar-code-dialog.component.html'
})
export class TestIdBarCodeDialogComponent {

    

    /* ************************************ Static Fields ************************************ */

    /* ************************************ Instance Fields ************************************ */

    /* ************************************ Constructors ************************************ */
    constructor(public dialogRef: MatDialogRef<TestIdBarCodeDialogComponent>,
                // @Inject(MAT_DIALOG_DATA) public data: any
                ) {
    }


    /* ************************************ Public Methods ************************************ */

    public onNoClick(): void {
        this.dialogRef.close();
    }


    /* ************************************ Private Methods ************************************ */
}
