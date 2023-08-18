import { Component, OnInit, SimpleChanges, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ApiResponse, DepartmentVo, ResponseStatus, UserEmpDto, UserTypeDetailDto, UserVo } from 'aayam-clinic-core';
import { UserApi } from 'src/app/@app/service/remote/user.api';
import { UiActionDto } from 'src/app/@shared/dto/ui-action.dto';
import { UserProfileVo } from 'src/app/@shared/dto/user-profile.dto';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
})

export class UserEditComponent implements OnInit {

    /* ************************************* Instance Field ******************************************** */
    showSectionUserProfile!: boolean;
    showSectionAccounts!: boolean;
    showSectionAttendance!: boolean;

    tabValue!: string;
    invalidFormStaff!: boolean;
    @Input()
    department!: DepartmentVo;

    @Input()
    departmentList!: DepartmentVo[];

    @Input()
    staff!: UserEmpDto;
    @Output()
    staffChange = new EventEmitter<UserEmpDto>();

    @Input()
    userProfile!: UserProfileVo;

    @Input()
    userTypeList!: UserTypeDetailDto[];

    filteredUserTypeList!: UserTypeDetailDto[];

    /* ************************************* Constructor ******************************************** */
    constructor(

        private userApi: UserApi,

    ) { }

    /* ************************************* Public Methods ******************************************** */
    public ngOnInit(): void {
        this._init();
    }

    public tabChange(): void {
        this._tabChange(this.tabValue);
    }

    public onSavingUserProfile(): void {
        this.userApi.addUpdateStaff(this.staff).subscribe((res: ApiResponse<UserVo>) => {
            if (res.status == ResponseStatus[ResponseStatus.SUCCESS]) {
                console.log("user",this.staff);
            }
        });
    }

    public onSavingUserAccount(): void {
    }

    public formChangeOrg(event: UiActionDto<boolean>): void {
        switch (event.action) {
            case 'CHANGE_FORM_STAFF':
                this.invalidFormStaff = event.data;
                break;
        }
    }
    /* ************************************* Private Methods ******************************************** */
    private _init(): void {
        this.tabValue = 'USERPROFILE'
        this.tabChange();
    }

    private _tabChange(tabValue: string): void {
        switch (tabValue) {
            case 'USERPROFILE':
                this._resetSection();
                this.showSectionUserProfile = true;
                break;
            case 'ACCOUNTS':
                this._resetSection();
                this.showSectionAccounts = true;
                break;
            case 'ATTENDANCE':
                this._resetSection();
                this.showSectionAttendance = true;
                break;

        }
    }

    private _resetSection(): void {
        this.showSectionUserProfile = false;
        this.showSectionAccounts = false;
        this.showSectionAttendance = false;
    }


}