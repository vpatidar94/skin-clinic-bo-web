import { Component, OnInit } from '@angular/core';
import { AddressVo, ApiResponse, DepartmentVo, UserTypeDetailDto } from 'aayam-clinic-core';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { DepartmentApi } from '../../service/remote/department.api';
import { UserApi } from '../../service/remote/user.api';
import { UserProfileVo } from 'src/app/@shared/dto/user-profile.dto';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {

  /* ************************************* Instance Field ******************************************** */

  showSectionUserList!: boolean;
  showSectionUserEdit!: boolean;

  userProfile!: UserProfileVo;
  department!: DepartmentVo;
  departmentList!: DepartmentVo[];

  userTypeList!: UserTypeDetailDto[];

  filteredUserTypeList!: UserTypeDetailDto[];

  serviceTimingData = [{
    serviceTime: '',
    ampm: 'am',
    serviceTimeEnd: '',
    ampmEnd: 'am'
  }];
  
  /* ************************************* Constructor ******************************************** */
  constructor(private keyValueStorageService: KeyValueStorageService,
    private departmentApi: DepartmentApi,
    private userApi: UserApi) { }

  /* ************************************* Public Methods ******************************************** */
  public ngOnInit(): void {
    this._init();
  }
  
  public addUser(): void {
    this._resetSection();
    this.showSectionUserEdit = true;

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
  }

  public _getDepartmentList() {
    const orgId = this.keyValueStorageService.getOrgId();
    if (!orgId) {
      return;
    }
    this.departmentApi.getOrgDepartmentList(orgId).subscribe((res: ApiResponse<DepartmentVo[]>) => {
      this.departmentList = res.body ?? [] as DepartmentVo[];
    })
  }

  public _getUserTypeList() {
    const orgId = this.keyValueStorageService.getOrgId();
    if (!orgId) {
      return;
    }
    this.userApi.getUserTypeList(orgId).subscribe((res: ApiResponse<UserTypeDetailDto[]>) => {
      this.userTypeList = res.body ?? [] as UserTypeDetailDto[];
    })
  }

  /* ************************************* Private Methods ******************************************** */

  private _init(): void {
    this._resetSection();
    this.showSectionUserList = true;
    this._getDepartmentList();
    this._getUserTypeList();
  }

  private _resetSection(): void {
    this.showSectionUserList = false;
    this.showSectionUserEdit = false;
  }

}