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

    columnFilters: { [key: string]: string } = {};

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

    // public applyFilter(event: Event) {
    //     const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    //     const filterFunction = (data: UserTypeDetailDto) => {
    //         const userTypeCode = data.userType?.code?.toLowerCase();
    //         const userTypeName = data.userType?.name?.toLowerCase();
    //         const departmentName = data.departmentName?.toLowerCase();
    //         return userTypeCode?.includes(filterValue) || userTypeName?.includes(filterValue) || departmentName?.includes(filterValue);
    //     };

    //     this.dataSource.filterPredicate = filterFunction;
    //     this.dataSource.filter = filterValue;

    //     if (this.dataSource.paginator) {
    //         this.dataSource.paginator.firstPage();
    //     }
    // }

    public applyFilter(columnName: string, event: Event) {
        const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.columnFilters[columnName] = filterValue;

    // Create a function to check if the filterValue matches a cell value
    const filterFunction = (data: UserTypeDetailDto) => {
        const departmentName = data.departmentName?.toLowerCase();

        // Apply individual column filters
        if (columnName === 'userTypeCode') {
            const userTypeCode = data.userType?.code?.toLowerCase();
            return userTypeCode?.includes(filterValue);
        } else if (columnName === 'userTypeName') {
            const userTypeName = data.userType?.name?.toLowerCase();
            return userTypeName?.includes(filterValue);
        } else if (columnName === 'departmentName') {
            return departmentName?.includes(filterValue);
        }

        // Return true for rows where no filter is applied
        return true;
    };

    this.dataSource.filterPredicate = filterFunction;

    // Combine all column filters
    const combinedFilters = Object.values(this.columnFilters).join(' ');

    this.dataSource.filter = combinedFilters;

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
