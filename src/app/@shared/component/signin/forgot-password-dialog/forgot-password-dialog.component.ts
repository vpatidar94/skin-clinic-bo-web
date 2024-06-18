import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VerifyOtpDialogComponent } from '../verify-otp-dialog/verify-otp-dialog.component';
import { UserApi } from 'src/app/@app/service/remote/user.api';
import { ApiResponse, MessageType } from 'aayam-clinic-core';
import { AlertMessage } from 'src/app/@shared/dto/alert-message';
import { GlobalEmitterService } from 'src/app/@shared/service/global-emitter.service';
import { MessageTypeConst } from 'src/app/@shared/const/message-type-const';

@Component({
    selector: 'app-forgot-password-dialog',
    templateUrl: './forgot-password-dialog.component.html',
    styleUrls: ['./forgot-password-dialog.component.scss']
})
export class ForgotPasswordDialogComponent implements OnInit {

    /* ************************************ Static Fields ************************************ */
    empCode!: string;

    /* ************************************ Constructors ************************************ */
    constructor(public dialogRef: MatDialogRef<ForgotPasswordDialogComponent>,
        public dialog: MatDialog,
        private glabalEmitterService: GlobalEmitterService,
        private userApi: UserApi
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

    public sendOtp(): void {
        if (this.empCode) {
            this.userApi.sendOtp(this.empCode).subscribe((res: ApiResponse<boolean>) => {
                if (res.body === true) { 
                    const message = {} as AlertMessage;
                    message.type = MessageTypeConst.SUCCESS;
                    message.text = 'Otp Sent Successfully';
                    this.glabalEmitterService.addAlerMsg(message);
                    this.dialog.open(VerifyOtpDialogComponent, {
                        width: '350px',
                        height: '250px',
                        data: {
                            empCode: this.empCode
                        }
                    });
                }
            });
        }
        
    }
    /* ************************************ Private Methods ************************************ */
}
