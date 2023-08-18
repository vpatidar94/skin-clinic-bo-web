import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AclVo, AddressVo, ApiResponse, DepartmentVo, ROLE, ROLE_NAME, ResponseStatus, UserEmpDto, UserTypeDetailDto, UserVo } from 'aayam-clinic-core';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { DepartmentApi } from '../../service/remote/department.api';
import { UserApi } from '../../service/remote/user.api';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GENDER_NAME } from '../../const/gender.consr';
import { SUB_ROLE_NAME } from '../../const/sub-role.const';
import { GlobalEmitterService } from 'src/app/@shared/service/global-emitter.service';
import { UserServiceTimingVo } from 'aayam-clinic-core/dist/vo/user-service-timing.vo';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit, AfterViewInit {

  /* ************************************* Instance Field ******************************************** */

  showSectionUserList!: boolean;
  showSectionUserEdit!: boolean;

  // showSectionStaffEdit!: boolean;


  invalidFormStaff!: boolean;
  genderName = GENDER_NAME as any;
  subRoleName = SUB_ROLE_NAME as any;
  roleName = ROLE_NAME as any

  displayedColumns: string[] = ['image', 'name', 'gender', 'email', 'cell', 'role', 'subRole', 'action'];
  dataSource!: MatTableDataSource<UserVo>;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  user!: UserVo;
  staff!: UserEmpDto;
  staffList!: Array<UserVo> | null;

  department!: DepartmentVo;
  departmentList!: DepartmentVo[];

  userTypeList!: UserTypeDetailDto[];

  filteredUserTypeList!: UserTypeDetailDto[];

  serviceTimingData = [{
    from: "",
    to: ""
  }];


  /* ************************************* Constructor ******************************************** */
  constructor(private keyValueStorageService: KeyValueStorageService,
    private departmentApi: DepartmentApi,
    private userApi: UserApi,
    private globalEmitterService: GlobalEmitterService
  ) {
    globalEmitterService.getAclChangedEmitter().subscribe(() => {
      this._getStaffList();
    });
  }

  /* ************************************* Public Methods ******************************************** */
  public ngOnInit(): void {
    this._init();
    this.dataSource = new MatTableDataSource<UserVo>([]);
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

  public formatPhoneNumber(cell: string): string {
    // TODO: Add phone util in npm
    return cell;
  }

  public addUser(): void {
    this._resetSection();
    this.showSectionUserEdit = true;
    const orgId = this.keyValueStorageService.getOrgId();
    const user = {} as UserVo;
    user.created = new Date();
    user.address = ({} as AddressVo);
    user.serviceTiming = (this.serviceTimingData as Array<UserServiceTimingVo>)
    const acl = {} as AclVo;
    acl.active = true;
    acl.brId = orgId;
    acl.orgId = orgId;
    const staff = new UserEmpDto(user, acl);
    this._addEditStaff(staff);
  }

  public getSubRole(emp: { [key: string]: AclVo }): string {
    const orgId = this.keyValueStorageService.getOrgId();
    if (!orgId) {
      return '';
    }
    const acl = emp[orgId];
    const subRole = acl?.subRole;
    return acl.role == ROLE.ADMIN ? 'All' : this.subRoleName[subRole ?? ''];
  }

  public getRole(emp: { [key: string]: AclVo }): string {
    const orgId = this.keyValueStorageService.getOrgId();
    if (!orgId) {
      return '';
    }
    const acl = emp[orgId];
    const role = acl?.role;
    return this.roleName[role ?? ''];
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
    this._getStaffList();
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

  private _getStaffList(): void {
    this.showSectionUserList = true;
    this.staffList = null
    const orgId = this.keyValueStorageService.getOrgId();
    if (!orgId) {
      return;
    }
    this.userApi.getStaffList(orgId).subscribe((apiResponse: ApiResponse<UserVo[]>) => {
      this.staffList = apiResponse.body ?? [] as Array<UserVo>;
      console.log("staffList", this.staffList);
      this._initStaffTable(this.staffList);
    });
  }

  private _initStaffTable(staffList: Array<UserVo>): void {
    this.dataSource = new MatTableDataSource(staffList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}