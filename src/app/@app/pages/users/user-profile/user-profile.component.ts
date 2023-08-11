import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UserProfileVo } from 'src/app/@shared/dto/user-profile.dto';
import { NgForm } from '@angular/forms';
import { GENDER_LIST } from 'src/app/@app/const/gender.consr';
import { AddressVo, DepartmentVo, ApiResponse, ResponseStatus, } from 'aayam-clinic-core';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { DepartmentApi } from 'src/app/@app/service/remote/department.api';

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
    
    serviceTimingData = [{
        serviceTime: '',
        ampm: 'am',
        serviceTimeEnd: '',
        ampmEnd: 'am'
    }];
    
    /* ************************************ Constructors ************************************ */
    constructor(private keyValueStorageService: KeyValueStorageService,
        private departmentApi: DepartmentApi) { }

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
        userProfileItem.userType = '';
        userProfileItem.fatherName = '';
        userProfileItem.alternateNumber = 0;
        userProfileItem.designation = '';
        userProfileItem.addPhoto = File;
        userProfileItem.uploadIdProof = File;
        userProfileItem.address = {} as AddressVo;
        userProfileItem.serviceTiming = this.serviceTimingData;
        this._init();
        userProfileItem.department = '';
        this.userProfile = userProfileItem;
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

    /* ************************************* Private Methods ******************************************** */
    
    private _init(): void {
        this._getDepartmentList();
    }

}