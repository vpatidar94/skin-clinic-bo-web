import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiResponse, DepartmentVo, ResponseStatus, UserTypeDetailDto, } from 'aayam-clinic-core';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { UserApi } from 'src/app/@app/service/remote/user.api';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserTypeVo } from 'aayam-clinic-core';
import { DepartmentApi } from 'src/app/@app/service/remote/department.api';

@Component({
    selector: 'app-user-type',
    templateUrl: './user-type.component.html',
    styleUrls: ['./user-type.component.scss'],
})

export class UserTypeComponent implements AfterViewInit, OnInit {

    /* ************************************* Static Field ********************************************* */
    /* ************************************* Instance Field ******************************************** */
    userType!: UserTypeVo;

    departmentList!: DepartmentVo[];
    userTypeList!: UserTypeDetailDto[];

    showSectionUserTypeList!: boolean;
    showSectionUserTypeEdit!: boolean;

    displayedColumns: string[] = ['userTypeCode', 'userTypeName', 'departmentName', "action"];
    dataSource = new MatTableDataSource<UserTypeDetailDto>([] as UserTypeDetailDto[]);


    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    /* ************************************* Constructors ******************************************** */
    constructor(private keyValueStorageService: KeyValueStorageService,
        private userApi: UserApi,
        private departmentApi: DepartmentApi,
    ) { }

    /* ************************************* Public Methods ******************************************** */
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

    public ngOnInit(): void {
        this._init();
    }

    public addUserTypeSection() {
        const userTypeDetails = {} as UserTypeVo;
        const orgId = this.keyValueStorageService.getOrgId();
        if (orgId) {
            userTypeDetails.orgId = orgId;
            userTypeDetails.brId = orgId;
        }
        userTypeDetails.name = "";
        userTypeDetails.departmentId = "";

        this._addEditUserItem(userTypeDetails);
        this._getDepartmentList();

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
            this.dataSource = new MatTableDataSource(this.userTypeList);
        })
    }

    public savingUserType(): void {
        this.userApi.addUpdateUserType(this.userType).subscribe((res: ApiResponse<UserTypeVo>) => {
            if (res.status === ResponseStatus[ResponseStatus.SUCCESS] && res.body) {
                this.userType = res.body;
                this._init();
            }
        });
    }

    public cancel(): void {
        this._init();
    }

    public editUserType(userType: UserTypeDetailDto): void {
        this.userType = { ...userType.userType };
        this._addEditUserItem(this.userType);
        this._getDepartmentList();
    }
    /* ************************************* Private Methods ******************************************** */
    private _init(): void {
        this._resetSection();
        this.showSectionUserTypeList = true;
        this._getUserTypeList();
    }

    private _resetSection(): void {
        this.showSectionUserTypeList = false;
        this.showSectionUserTypeEdit = false;
    }

    private _addEditUserItem(userTypeDetails: UserTypeVo): void {
        this.userType = userTypeDetails;

        this._resetSection();
        this.showSectionUserTypeEdit = true;
    }


}
