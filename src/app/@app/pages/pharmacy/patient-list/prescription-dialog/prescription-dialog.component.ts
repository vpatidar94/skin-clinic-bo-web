import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiResponse, PRODUCT_PACK_TYPE_LIST, PRODUCT_TYPE_LIST, ProductVo, ResponseStatus } from 'aayam-clinic-core';
import { ProductApi } from 'src/app/@app/service/remote/product.api';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';

@Component({
    selector: 'app-prescription-dialog',
    templateUrl: './prescription-dialog.component.html',
})
export class PrescriptionDialogComponent implements OnInit {
    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */

   prescription : any;


    /* ************************************* Constructors ******************************************** */
    constructor(public dialogRef: MatDialogRef<PrescriptionDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any


    ) { }

    /* ************************************* Public Methods ******************************************** */
    public ngOnInit(): void {
        this.prescription = this.data.booking.booking.prescription?this.data.booking.booking.prescription:[];
    }

    /* ************************************* Private Methods ******************************************** */
    
   

}