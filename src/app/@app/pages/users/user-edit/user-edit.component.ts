import { Component, OnInit, SimpleChanges, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ApiResponse, DepartmentVo, ResponseStatus, UserAccountVo, UserEmpDto, UserTypeDetailDto, UserVo, AssetPathUtility } from 'aayam-clinic-core';
import { UserApi } from 'src/app/@app/service/remote/user.api';
import { UiActionDto } from 'src/app/@shared/dto/ui-action.dto';
import { IdCardDialogComponent } from './id-card-dialog/id-card-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
})

export class UserEditComponent implements OnInit, OnChanges {

    /* ************************************* Instance Field ******************************************** */
    /* ************************************* Static Field ******************************************** */
    showSectionUserProfile!: boolean;
    showSectionAccounts!: boolean;
    showSectionAttendance!: boolean;
    showSectionUserLogin!: boolean;

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
    userAccounts!: UserAccountVo;

    @Input()
    userTypeList!: UserTypeDetailDto[];

    filteredUserTypeList!: UserTypeDetailDto[];

    fileEmpImg!: File;
    fileEmpIdProof!: File;

    /* ************************************* Constructor ******************************************** */
    constructor(
        private userApi: UserApi,
        public dialog: MatDialog
    ) { }

    /* ************************************* Public Methods ******************************************** */
    public ngOnInit(): void {
        this._init();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['staff']) {
            this.staff = changes['staff']?.currentValue as UserEmpDto;
        }
        if (changes['department']) {
            this.department = changes['department']?.currentValue as DepartmentVo;
        }
        if (changes['departmentList']) {
            this.departmentList = changes['departmentList']?.currentValue as DepartmentVo[];
        }
        if (changes['userTypeList']) {
            this.userTypeList = changes['userTypeList']?.currentValue as UserTypeDetailDto[];
        }
    }

    public tabChange(): void {
        this._tabChange(this.tabValue);
    }

    public onSavingUserProfile(): void {
        this.userApi.addUpdateStaff(this.staff).subscribe((res: ApiResponse<UserVo>) => {
            const userId = res.body?._id ?? '';
            if (this.fileEmpImg) {
                this.uploadUserImage(userId);
            }
            if (this.fileEmpIdProof) {
                this.uploadUserIdProof(userId);
            }
        });
    }

    public uploadUserImage(empId: string): void {
        this.userApi.uploadUserImage(this.fileEmpImg, empId, AssetPathUtility.ASSET_IDENTITY.EMP_PHOTO).subscribe((res: any) => {
            this.staff.user.img = res.body;
            this.staffChange.emit(this.staff);
        });
    }

    public uploadUserIdProof(empId: string): void {
        this.userApi.uploadUserImage(this.fileEmpIdProof, empId, AssetPathUtility.ASSET_IDENTITY.EMP_ID_PROOF).subscribe((res: any) => {
            this.staff.user.imgIdProof = res.body;
            this.staffChange.emit(this.staff);
        });
    }

    public onSavingUserAccount(): void {
        this.userApi.addUpdateUserAccount(this.userAccounts).subscribe((res: ApiResponse<UserAccountVo>) => {
            if (res.status == ResponseStatus[ResponseStatus.SUCCESS]) {
            }
        })
    }

    public formChangeOrg(event: UiActionDto<any>): void {
        switch (event.action) {
            case 'CHANGE_FORM_STAFF':
                this.invalidFormStaff = event.data;
                break;
            case 'USER_PHOTO_UPLOAD':
                this.fileEmpImg = event.data as File;
                break;
            case 'USER_ID_PROOF_UPLOAD':
                this.fileEmpIdProof = event.data as File;
                break;
        }
    }

    public generateIdCard(enterAnimationDuration: string, exitAnimationDuration: string):void {
            this.dialog.open(IdCardDialogComponent, {
                width: '550px',
                height: '550px',
                enterAnimationDuration,
                exitAnimationDuration,
                data: { staff: this.staff }
            });
            
            
            
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

            // newly added for user login
            case 'USERLOGIN':
                this._resetSection();
                this.showSectionUserLogin = true;
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
        this.showSectionUserLogin = false;
    }
}