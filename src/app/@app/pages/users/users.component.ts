import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AclVo, AddressVo, ApiResponse, DepartmentVo, UserEmpDto, UserTypeDetailDto, UserVo } from 'aayam-clinic-core';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { DepartmentApi } from '../../service/remote/department.api';
import { UserApi } from '../../service/remote/user.api';
import { UserProfileVo } from 'src/app/@shared/dto/user-profile.dto';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  SerialNo: number;
  ServiceType: string;
  DoctorsName: string;
  Department: string;
  Action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { SerialNo: 1, ServiceType: 'OPD', DoctorsName: 'Dr.Mayank Patidar', Department: '1120', Action: "Edit | Delete" },
  { SerialNo: 2, ServiceType: 'Dressing', DoctorsName: 'Dr.aayam', Department: '1120', Action: "Edit | Delete" },
  { SerialNo: 3, ServiceType: '', DoctorsName: 'Dr.Atharv', Department: '11:20', Action: "Edit | Delete" },
  { SerialNo: 4, ServiceType: '', DoctorsName: 'Dr.Aman', Department: '1120', Action: "Edit | Delete" },
  { SerialNo: 5, ServiceType: 'z', DoctorsName: 'Dr.aayam', Department: '1120', Action: "Edit | Delete" },
  { SerialNo: 6, ServiceType: '', DoctorsName: 'Dr.Atharv', Department: '1120', Action: "Edit | Delete" },
  { SerialNo: 7, ServiceType: 'kat', DoctorsName: 'Dr.Aman', Department: '1120', Action: "Edit | Delete" },
]

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit, AfterViewInit {

  /* ************************************* Instance Field ******************************************** */

  showSectionUserList!: boolean;
  showSectionUserEdit!: boolean;

  // newly staff
  showSectionStaffEdit!: boolean;

  displayedColumns: string[] = ['Serial No', 'Service Type', 'DoctorsName', "Department", "Action"];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  userProfile!: UserProfileVo;
  staff!: UserEmpDto;
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

  public ngAfterViewInit() {
    this.paginator.showFirstLastButtons = false;
    this.paginator.hidePageSize = false;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  public addUser(): void {
    this._resetSection();
    this.showSectionUserEdit = true;
    
// userProfile (to be removed later as UserProfileVo will not be used)
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

// newly added staff
  const orgId = this.keyValueStorageService.getOrgId();
  const user = {} as UserVo;
  user.created = new Date();
  user.address = ({} as AddressVo);
  const acl = {} as AclVo;
  acl.active = true;
  acl.brId = orgId;
  acl.orgId = orgId;
  const staff = new UserEmpDto(user, acl);
  this._addEditStaff(staff);
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

  private _addEditStaff(staff: UserEmpDto): void {
    this.staff = staff;
    this._resetSection();
    this.showSectionUserEdit = true;
  }

}