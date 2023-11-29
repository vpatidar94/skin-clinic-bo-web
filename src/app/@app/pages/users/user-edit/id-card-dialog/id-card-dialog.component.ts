import { outputAst } from '@angular/compiler';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserEmpDto } from 'aayam-clinic-core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-id-card-dialog',
    templateUrl: './id-card-dialog.component.html',
    styleUrls: ['./id-card-dialog.component.scss']
})
export class IdCardDialogComponent {

    /* ************************************ Static Fields ************************************ */

    /* ************************************ Instance Fields ************************************ */

    /* ************************************ Constructors ************************************ */
    constructor(public dialogRef: MatDialogRef<IdCardDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.staff = data.staff;
    }

    staff: UserEmpDto;
    bucketUrl = environment.bucketUrl;

    /* ************************************ Public Methods ************************************ */
    public onNoClick(): void {
        this.dialogRef.close();
    }

    public printBarcode() {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            const printableContent = document.getElementById('printable-content');

            if (printableContent) {
                // Clone the content to be printed
                const contentToPrint = printableContent.cloneNode(true);

                // Append the cloned content to the new window
                printWindow.document.body.appendChild(contentToPrint);

                // Close the new window after printing
                printWindow.onafterprint = () => {
                    printWindow.close();
                };

                // Use window.print() to trigger the browser's print functionality for the new window
                printWindow.print();
            }
        }
    }


    /* ************************************ Private Methods ************************************ */
}
