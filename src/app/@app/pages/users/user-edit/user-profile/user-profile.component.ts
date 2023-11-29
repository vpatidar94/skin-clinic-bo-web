import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges, OnChanges } from '@angular/core';
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

export class UserProfileComponent implements OnInit, OnChanges {
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


    /* ************************************ Constructors ************************************ */
    constructor(private keyValueStorageService: KeyValueStorageService) { }

    /* ************************************ Public Methods ************************************ */

    public ngOnInit(): void {
        this._init();
        this.staffForm?.valueChanges?.subscribe(() => {
            this._formChanged();
        });
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

    onPhotoSelected(event: any) {
        if (event.target.files.length > 0) {
            const actionDto = {
                action: 'USER_PHOTO_UPLOAD',
                data: event.target.files[0]
            } as UiActionDto<File>;
            this.pubSub.emit(actionDto);
        }
    }

    onIdProofSelected(event: any) {
        if (event.target.files.length > 0) {
            const actionDto = {
                action: 'USER_ID_PROOF_UPLOAD',
                data: event.target.files[0]
            } as UiActionDto<File>;
            this.pubSub.emit(actionDto);
        }
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
        this.staffChange.emit(this.staff);
    }

    public filterUserTypesByDepartment(departmentId: string | null | undefined) {
        this.staff.acl.userTypeId = null;
        this.filteredUserTypeList = this.userTypeList.filter(item => item.userType.departmentId === departmentId);
        this.staffChange.emit(this.staff);
    }

    /* ************************************* Private Methods ******************************************** */

    private _init(): void {
        const orgId = this.keyValueStorageService.getOrgId();
        if (!orgId) {
            return;
        }
        if (this.staff.acl?.departmentId) {
            this.filteredUserTypeList = this.userTypeList?.filter((it: UserTypeDetailDto) => it.userType.departmentId === this.staff.acl.departmentId);

        }
    }

    private _formChanged(): void {
        const actionDto = {
            action: 'CHANGE_FORM_STAFF',
            data: this.staffForm.invalid || this.inValidAddressForm
        } as UiActionDto<boolean>;
        this.pubSub.emit(actionDto);
    }

}