import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AclVo, AddressVo, ApiResponse, DepartmentVo, ROLE, ROLE_NAME, UserAccountVo, UserEmpDto, UserTypeDetailDto, UserVo } from 'aayam-clinic-core';
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
import { environment } from 'src/environments/environment';
import { ConfirmDeleteDialogComponent } from 'src/app/@shared/component/dialog/confirm-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit, AfterViewInit {

  /* ************************************* Instance Field ******************************************** */
  showSectionUserList!: boolean;
  showSectionUserEdit!: boolean;

  invalidFormStaff!: boolean;
  genderName = GENDER_NAME as any;
  subRoleName = SUB_ROLE_NAME as any;
  roleName = ROLE_NAME as any

  displayedColumns: string[] = ['img', 'userCode', 'date', 'userName', 'type', 'department', 'action'];

  dataSource!: MatTableDataSource<UserVo>;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  user!: UserVo;
  staff!: UserEmpDto;
  staffList!: Array<UserVo> | null;
  userAccounts!: UserAccountVo;
  empOrgId!: string;
  department!: DepartmentVo;
  departmentList!: DepartmentVo[];

  userTypeList!: UserTypeDetailDto[];

  filteredUserTypeList!: UserTypeDetailDto[];

  serviceTimingData = [{
    from: "",
    to: ""
  }];

  bucketUrl = environment.bucketUrl;

  /* ************************************* Constructor ******************************************** */
  constructor(private keyValueStorageService: KeyValueStorageService,
    private departmentApi: DepartmentApi,
    private userApi: UserApi,
    private globalEmitterService: GlobalEmitterService,
    private dialog : MatDialog
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
    const orgId = this.keyValueStorageService.getOrgId();
    const user = {} as UserVo;
    user.created = new Date();
    user.address = {} as AddressVo;
    user.serviceTiming = (this.serviceTimingData as Array<UserServiceTimingVo>);
    const acl = {} as AclVo;
    acl.active = true;
    acl.brId = orgId;
    acl.orgId = orgId;
    acl.role = ROLE.EMP;
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

  public deleteStaff(userId: string): void {
    const orgId = this.keyValueStorageService.getOrgId();
    if (!orgId) {
      return;
    }
    this.userApi.deleteStaff(orgId, userId).subscribe(() => {
      this._init();
    })
  }

  confirmDeleteStaff(userId: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this booking?' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteStaff(userId);
      }
    });
  }

  public _getDepartmentList() {
    const orgId = this.keyValueStorageService.getOrgId();
    if (!orgId) {
      return;
    }
    this.departmentApi.getOrgDepartmentList(orgId, "").subscribe((res: ApiResponse<DepartmentVo[]>) => {
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

  public editUsers(user: UserVo): void {
    const orgId = this.keyValueStorageService.getOrgId();
    if (!orgId) {
      return;
    }
    const acl = user.emp[orgId] as AclVo;
    if (!acl.role) {
      acl.role = ROLE.EMP;
    }
    const empDto = new UserEmpDto(user, acl);
    this._addEditStaff(empDto);
  }

  public getUserTypeName(row: UserVo): string {
    const userTypeId = row.emp[this.empOrgId].userTypeId;
    const userType = this.userTypeList?.find(type => type.userType._id === userTypeId);
    return userType ? userType.userType.name : '';
  }

  public getDepartmentName(row: UserVo): string {
    const departmentId = row.emp[this.empOrgId].departmentId;
    const department = this.departmentList?.find(dep => dep._id === departmentId);
    return department ? department.name : '';
  }

  public cancel(): void {
    this._resetSection();
    this.showSectionUserList = true;

  }

  /* ************************************* Private Methods ******************************************** */

  private _init(): void {
    this._resetSection();
    this.showSectionUserList = true;
    this._getDepartmentList();
    this._getUserTypeList();
    this._getStaffList();

    const orgId = this.keyValueStorageService.getOrgId();
    if (!orgId) {
      return;
    }
    this.empOrgId = orgId;
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
      this._initStaffTable(this.staffList);
    });
  }

  private _initStaffTable(staffList: Array<UserVo>): void {
    this.dataSource = new MatTableDataSource(staffList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}