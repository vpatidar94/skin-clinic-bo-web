import { Component, OnInit, } from '@angular/core';
import { UserProfileVo } from 'src/app/@shared/dto/user-profile.dto';
import { NgForm } from '@angular/forms';
import { GENDER_LIST } from 'src/app/@app/const/gender.consr';
import { AddressVo, DepartmentVo, ApiResponse, UserTypeDetailDto, } from 'aayam-clinic-core';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { DepartmentApi } from 'src/app/@app/service/remote/department.api';
import { UserApi } from 'src/app/@app/service/remote/user.api';


@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */
    department!: DepartmentVo;
    departmentList!: DepartmentVo[];
    
    genderList = GENDER_LIST;
    
    userProfile!: UserProfileVo;
    
    userTypeList!: UserTypeDetailDto[];

    filteredUserTypeList!: UserTypeDetailDto[];

    serviceTimingData = [{
        serviceTime: '',
        ampm: 'am',
        serviceTimeEnd: '',
        ampmEnd: 'am'
    }];

    /* ************************************ Constructors ************************************ */
    constructor(private keyValueStorageService: KeyValueStorageService,
        private departmentApi: DepartmentApi,
        private userApi: UserApi) { }

    /* ************************************ Public Methods ************************************ */

    public ngOnInit(): void {
        const userProfileItem = {} as UserProfileVo;
        userProfileItem.userId = '';
        userProfileItem.date = new Date();
        userProfileItem.firstName = '';
        userProfileItem.lastName = '';
        userProfileItem.gender = '';
        userProfileItem.age = 0;
        userProfileItem.contactNumber = 0;
        userProfileItem.email = '';
        userProfileItem.dob = new Date();
        userProfileItem.userType = "";
        userProfileItem.fatherName = '';
        userProfileItem.alternateNumber = 0;
        userProfileItem.designation = '';
        userProfileItem.addPhoto = File;
        userProfileItem.uploadIdProof = File;
        userProfileItem.address = {} as AddressVo;
        userProfileItem.serviceTiming = this.serviceTimingData;
        userProfileItem.department = '';
        this.userProfile = userProfileItem;

        this._init();

    }

    public _getDepartmentList() {
        const orgId = this.keyValueStorageService.getOrgId();
        if (!orgId) {
            return;
        }
        this.departmentApi.getOrgDepartmentList(orgId).subscribe((res: ApiResponse<DepartmentVo[]>) => {
            this.departmentList = res.body ?? [] as DepartmentVo[];
            console.log("XX XX users department", this.departmentList);
        })
    }

    public _getUserTypeList() {
        const orgId = this.keyValueStorageService.getOrgId();
        if (!orgId) {
            return;
        }
        this.userApi.getUserTypeList(orgId).subscribe((res: ApiResponse<UserTypeDetailDto[]>) => {
            this.userTypeList = res.body ?? [] as UserTypeDetailDto[];
            console.log("xx xxuserTypeList", this.userTypeList);

        })
    }

    public addServiceTiming() {
        this.userProfile.serviceTiming.push({
            serviceTime: '',
            ampm: 'am',
            serviceTimeEnd: '',
            ampmEnd: 'am'
        });
    }

    public removeServiceTiming(index: number): void {
        this.userProfile.serviceTiming.splice(index, 1);
    }

    public onSavingUserType(): void {
        console.log("XX userProfile", this.userProfile)
    }

    public filterUserTypesByDepartment(departmentId: string) {
        this.filteredUserTypeList = this.userTypeList.filter(item => item.userType.departmentId === departmentId);
    }


    /* ************************************* Private Methods ******************************************** */

    private _init(): void {
        this.filteredUserTypeList = this.userTypeList;
        this._getDepartmentList();
        this._getUserTypeList();
    }

}