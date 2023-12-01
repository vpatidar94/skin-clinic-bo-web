import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VerifyOtpDialogComponent } from '../verify-otp-dialog/verify-otp-dialog.component';

@Component({
    selector: 'app-forgot-password-dialog',
    templateUrl: './forgot-password-dialog.component.html',
    styleUrls: ['./forgot-password-dialog.component.scss']
})
export class ForgotPasswordDialogComponent implements OnInit {

    /* ************************************ Static Fields ************************************ */
    /* ************************************ Constructors ************************************ */
    constructor(public dialogRef: MatDialogRef<ForgotPasswordDialogComponent>,
        public dialog: MatDialog,
        ) {
    }

    /* ************************************ Public Methods ************************************ */
    public ngOnInit(): void {
        
    }

    public onNoClick(): void {
        this.dialogRef.close();
    }

    public printBarcode() {

        const printContents = document?.getElementById('printable-content')?.innerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents ?? '';

        window.print();

        document.body.innerHTML = originalContents;
        this.dialogRef.close();
    }

    public sendOtp(enterAnimationDuration: string, exitAnimationDuration: string):void {
        this.dialog.open(VerifyOtpDialogComponent, {
            width: '350px',
            height: '250px',
            enterAnimationDuration,
            exitAnimationDuration,
        });
    }
    /* ************************************ Private Methods ************************************ */
}
