import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AclVo, AddressVo, ApiResponse, OrgVo, ROLE, ROLE_NAME, ResponseStatus, UserEmpDto, UserVo } from 'aayam-clinic-core';
import { GENDER_NAME } from 'src/app/@app/const/gender.consr';
import { SUB_ROLE_NAME } from 'src/app/@app/const/sub-role.const';
import { UserApi } from 'src/app/@app/service/remote/user.api';
import { ResponseStatusConst } from 'src/app/@shared/const/response-status-const';
import { UiActionDto } from 'src/app/@shared/dto/ui-action.dto';
import { GlobalEmitterService } from 'src/app/@shared/service/global-emitter.service';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  /* ************************************* Static Field ********************************************* */
  /* ************************************* Instance Field ******************************************** */
  showSectionStaffList!: boolean;
  showSectionStaffEdit!: boolean;

  staffList!: Array<UserVo> | null;
  user!: UserVo;
  staff!: UserEmpDto;

  invalidFormStaff!: boolean;
  genderName = GENDER_NAME as any;
  subRoleName = SUB_ROLE_NAME as any;
  roleName = ROLE_NAME as any

  displayedColumns: string[] = ['image', 'name', 'gender', 'email', 'cell', 'role', 'subRole', 'action'];
  dataSource!: MatTableDataSource<UserVo>;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  /* ************************************* Constructors ******************************************** */
  constructor(private userApi: UserApi,
    private keyValueStorageService: KeyValueStorageService,
    private globalEmitterService: GlobalEmitterService
  ) {
    globalEmitterService.getAclChangedEmitter().subscribe(() => {
      this._getStaffList();
    });
  }

  /* ************************************* Public Methods ******************************************** */
  public ngOnInit(): void {
    this._init();
  }

  public applyFilter(filterValue: any): void {
    this.dataSource.filter = filterValue.value.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public cancel(): void {
    this._resetSection();
    this.showSectionStaffList = true;
  }

  public formatPhoneNumber(cell: string): string {
    // TODO: Add phone util in npm
    return cell;
  }

  public addStaff(): void {
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

  public formChangeOrg(event: UiActionDto<boolean>): void {
    switch (event.action) {
      case 'CHANGE_FORM_STAFF':
        this.invalidFormStaff = event.data;
        break;
    }
  }

  public saveStaff(): void {
    this.userApi.addUpdateStaff(this.staff).subscribe((res: ApiResponse<UserVo>) => {
      if (res.status == ResponseStatusConst.SUCCESS) {
        this._init();
      }
    });
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

  /* ************************************* Private Methods ******************************************** */
  private _init(): void {
    this._resetSection();
    this._getStaffList();
  }

  private _resetSection(): void {
    this.showSectionStaffList = false;
    this.showSectionStaffEdit = false;
  }


  private _getStaffList(): void {
    this.showSectionStaffList = true;
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

  private _addEditStaff(staff: UserEmpDto): void {
    this.staff = staff;
    this._resetSection();
    this.showSectionStaffEdit = true;
  }
}

