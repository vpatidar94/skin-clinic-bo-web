import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { NgxBarcode6Module } from 'ngx-barcode6';

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
