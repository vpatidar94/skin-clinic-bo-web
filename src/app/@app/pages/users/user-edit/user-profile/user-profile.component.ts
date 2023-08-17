import { Component, OnInit, Input } from '@angular/core';
import { UserProfileVo } from 'src/app/@shared/dto/user-profile.dto';
import { NgForm } from '@angular/forms';
import { GENDER_LIST } from 'src/app/@app/const/gender.consr';
import { DepartmentVo, UserEmpDto, UserTypeDetailDto, } from 'aayam-clinic-core';
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
    @Input()
    department!: DepartmentVo;

    @Input()
    departmentList!: DepartmentVo[];
    
    genderList = GENDER_LIST;
    
    @Input()
    staff!: UserEmpDto;

    @Input()
    userProfile!: UserProfileVo;
    
    @Input()
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
        this._init();
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


    public filterUserTypesByDepartment(departmentId: string | null | undefined) {
        this.filteredUserTypeList = this.userTypeList.filter(item => item.userType.departmentId === departmentId);
    }

    public checkIt(): void {
        console.log("xx userProfile",this.staff)
    }
    /* ************************************* Private Methods ******************************************** */

    private _init(): void {
        this.filteredUserTypeList = this.userTypeList;
    }

}