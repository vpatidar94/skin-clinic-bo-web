import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';

@Component({
    selector: 'app-verify-otp-dialog',
    templateUrl: './verify-otp-dialog.component.html',
    styleUrls: ['./verify-otp-dialog.component.scss']
})
export class VerifyOtpDialogComponent implements OnInit {

    /* ************************************ Static Fields ************************************ */

    /* ************************************ Instance Fields ************************************ */

    /* ************************************ Constructors ************************************ */
    constructor(public dialogRef: MatDialogRef<VerifyOtpDialogComponent>,
        private keyValueStorageService: KeyValueStorageService,
        public dialog: MatDialog,
        ) {
    }

    /* ************************************ Public Methods ************************************ */
    public ngOnInit(): void {
        
    }

    public onNoClick(): void {
        this.dialogRef.close();
    }
   
    public verifyOtp():void {
    //    NAVIGATE TO THE NEW PASSWORD PAGE/LINK
    }
    /* ************************************ Private Methods ************************************ */
}
