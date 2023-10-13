import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';


@Component({
    selector: 'app-pdf-viewer-dialog',
    templateUrl: 'pdf-viewer-dialog.component.html'
})
export class PdfViewerDialogComponent {

    /* ************************************ Static Fields ************************************ */
    /* ************************************ Instance Fields ************************************ */
    isPdfLoaded: boolean = false;
    private pdf!: PDFDocumentProxy;

    /* ************************************ Constructors ************************************ */
    constructor(public dialogRef: MatDialogRef<PdfViewerDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    /* ************************************ Public Methods ************************************ */
    public onNoClick(): void {
        this.dialogRef.close();
    }

    public print(): void {
        this.pdf.getData().then((u8) => {
            let blob = new Blob([u8.buffer], {
                type: 'application/pdf'
            });
            const blobUrl = window.URL.createObjectURL((blob));
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = blobUrl;
            document.body.appendChild(iframe);
            iframe.contentWindow?.print();
            this.onNoClick();
        });
    }

    public onLoaded(pdf: PDFDocumentProxy) {
        this.pdf = pdf;
        this.isPdfLoaded = true;
    }

    /* ************************************ Private Methods ************************************ */
}
