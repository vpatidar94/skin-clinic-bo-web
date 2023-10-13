import { Component, Input, OnInit } from '@angular/core';
import { AccountsVo } from 'src/app/@shared/dto/accounts.dto';
import { ApiResponse, ResponseStatus, UserAccountVo, UserDeductionVo, UserEmpDto, UserIncomeVo} from 'aayam-clinic-core';
import { UserBankDetailVo } from 'aayam-clinic-core/dist/vo/user-bank-detail.vo';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { UserApi } from 'src/app/@app/service/remote/user.api';
import { GlobalEmitterService } from 'src/app/@shared/service/global-emitter.service';

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.scss']
})

export class AccountComponent implements OnInit {
    accounts!: AccountsVo;
    
    userAccounts!: UserAccountVo;

    @Input()
    staff!: UserEmpDto;

    /* ************************************ Constructors ************************************ */
    constructor(private keyValueStorageService: KeyValueStorageService,
        private userApi: UserApi, private globalEmitterService: GlobalEmitterService
    ) {}


    /* ************************************ Public Methods ************************************ */
    ngOnInit(): void {
        const accountDetails = {} as UserAccountVo;
        accountDetails.salaryType = "";
        accountDetails.userId = this.staff.user._id;
        accountDetails.salaryType = "";
        accountDetails.bankDetail = {} as UserBankDetailVo;
        accountDetails.income = {} as UserIncomeVo;
        accountDetails.deduction = {} as UserDeductionVo;
        this.userAccounts = accountDetails;
    }
    
    public onSavingUserAccount(): void {
        this.userApi.addUpdateUserAccount(this.userAccounts).subscribe((res: ApiResponse<UserAccountVo>) => {
            if (res.status == ResponseStatus[ResponseStatus.SUCCESS]) {
                console.log("user", this.userAccounts);
            }
        })
    }
    /* ************************************ Private Methods ************************************ */
}