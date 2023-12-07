import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiResponse } from 'aayam-clinic-core';
import { UserApi } from 'src/app/@app/service/remote/user.api';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';

@Component({
    selector: 'app-verify-otp-dialog',
    templateUrl: './verify-otp-dialog.component.html',
    styleUrls: ['./verify-otp-dialog.component.scss']
})
export class VerifyOtpDialogComponent implements OnInit {

    /* ************************************ Static Fields ************************************ */
    otp!: string;

    /* ************************************ Instance Fields ************************************ */

    /* ************************************ Constructors ************************************ */
    constructor(public dialogRef: MatDialogRef<VerifyOtpDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        public userApi: UserApi
        ) {
    }

    /* ************************************ Public Methods ************************************ */
    public ngOnInit(): void {
        
    }

    public onNoClick(): void {
        this.dialogRef.close();
    }
   
    public verifyOtp(): void {
        if (this.otp) {
            this.userApi.resetPassword(this.data.empCode, this.otp).subscribe((res: ApiResponse<string>) => {
                if (res.body && res.body?.length > 0) {
                    console.log('xxx xxx x x res.body ', res.body);
                    window.location.href = res.body;
                }
            });
        }
    }
    /* ************************************ Private Methods ************************************ */
}
