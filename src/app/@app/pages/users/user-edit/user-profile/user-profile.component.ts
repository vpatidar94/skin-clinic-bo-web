import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GENDER_LIST } from 'src/app/@app/const/gender.consr';
import { DepartmentVo, UserEmpDto, UserTypeDetailDto, } from 'aayam-clinic-core';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { DepartmentApi } from 'src/app/@app/service/remote/department.api';
import { UserApi } from 'src/app/@app/service/remote/user.api';
import { UiActionDto } from 'src/app/@shared/dto/ui-action.dto';


@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */
    @Input()
    department!: DepartmentVo;

    @Input()
    departmentList!: DepartmentVo[];

    genderList = GENDER_LIST;

    @Input()
    staff!: UserEmpDto;
    @Output()
    staffChange = new EventEmitter<UserEmpDto>();

    @Output()
    pubSub = new EventEmitter<any>();

    @ViewChild('staffForm', { static: true })
    staffForm!: NgForm;


    @Input()
    userTypeList!: UserTypeDetailDto[];

    filteredUserTypeList!: UserTypeDetailDto[];

    inValidAddressForm!: boolean;

    // 

    /* ************************************ Constructors ************************************ */
    constructor(private keyValueStorageService: KeyValueStorageService,
        private departmentApi: DepartmentApi,
        private userApi: UserApi) { }

    /* ************************************ Public Methods ************************************ */

    public ngOnInit(): void {
        this._init();
        // this.staffForm.valueChanges.subscribe(() => {
        //     this._formChanged();
        // });
    }

    public addServiceTiming() {
        this.staff.user.serviceTiming.push({
            from: '',
            to: '',

        });
    }

    public addressFormChange(event: UiActionDto<boolean>): void {
        switch (event.action) {
            case 'CHANGE_FORM_ADDRESS':
                this.inValidAddressForm = event.data;
                this._formChanged();
                this.staffChange.emit(this.staff);

                break;
        }
    }
    public removeServiceTiming(index: number): void {
        this.staff.user.serviceTiming.splice(index, 1);
    }


    public filterUserTypesByDepartment(departmentId: string | null | undefined) {
        this.filteredUserTypeList = this.userTypeList.filter(item => item.userType.departmentId === departmentId);
    }

    public checkIt(): void {
        console.log("xx userProfile", this.staff)
    }
    /* ************************************* Private Methods ******************************************** */

    private _init(): void {
        this.filteredUserTypeList = this.userTypeList;
    }

    private _formChanged(): void {
        const actionDto = {
            action: 'CHANGE_FORM_STAFF',
            data: this.staffForm.invalid || this.inValidAddressForm
        } as UiActionDto<boolean>;
        this.pubSub.emit(actionDto);
    }

}