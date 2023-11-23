import { Component, Input, OnInit } from '@angular/core';
import { AccountsVo } from 'src/app/@shared/dto/accounts.dto';
import { ApiResponse, ResponseStatus, UserAccountVo, UserDeductionVo, UserEmpDto, UserIncomeVo } from 'aayam-clinic-core';
import { UserBankDetailVo } from 'aayam-clinic-core/dist/vo/user-bank-detail.vo';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { UserApi } from 'src/app/@app/service/remote/user.api';
import { GlobalEmitterService } from 'src/app/@shared/service/global-emitter.service';

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.scss']
})

export class UserLoginComponent implements OnInit {

    public ngOnInit(): void {
    }
}