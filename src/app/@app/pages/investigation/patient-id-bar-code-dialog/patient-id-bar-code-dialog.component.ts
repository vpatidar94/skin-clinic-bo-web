import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrgBookingDto } from 'aayam-clinic-core';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import { NgxBarcode6Module } from 'ngx-barcode6';

@Component({
  selector: 'app-patient-id-bar-code-dialog',
  templateUrl: './patient-id-bar-code-dialog.component.html',
  styleUrls: ['./patient-id-bar-code-dialog.component.scss']
})
export class PatientIdBarCodeDialogComponent {

  /* ************************************ Static Fields ************************************ */

  /* ************************************ Instance Fields ************************************ */

  /* ************************************ Constructors ************************************ */
  // @Input()
  // booking!: OrgBookingDto;


  constructor(public dialogRef: MatDialogRef<PatientIdBarCodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
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
