import { Component, OnInit, SimpleChanges, Input, OnChanges } from '@angular/core';
import { DepartmentVo, UserEmpDto, UserTypeDetailDto } from 'aayam-clinic-core';
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

    @Input()
    department!: DepartmentVo;

    @Input()
    departmentList!: DepartmentVo[];

    @Input()
    staff!: UserEmpDto;
    
    @Input()
    userProfile!: UserProfileVo;

    @Input()
    userTypeList!: UserTypeDetailDto[];

    filteredUserTypeList!: UserTypeDetailDto[];

    /* ************************************* Public Methods ******************************************** */
    public ngOnInit(): void {
        this._init();
    }

    public tabChange(): void {
        this._tabChange(this.tabValue);
    }

    public onSavingUserProfile(): void {
    }

    public onSavingUserAccount(): void {
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