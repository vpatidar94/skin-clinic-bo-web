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

    originalDataSource: UserTypeDetailDto[] = [];
    filteredData: UserTypeDetailDto[] = [];

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

    public applyFilter(columnName: string, event: Event) {
        const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
        this.columnFilters[columnName] = filterValue;
        // Combine all column filters
        const combinedFilters = Object.values(this.columnFilters).filter((filter) => !!filter);
        // If there are no filters, show all data
        if (combinedFilters.length === 0) {
            this.dataSource.data = this.originalDataSource;
            this.filteredData = []; // Reset filtered data array
            return;
        }
        // Filter the data progressively from the original data or the previously filtered data
        let dataToFilter: UserTypeDetailDto[];
        if (this.filteredData.length > 0) {
            dataToFilter = [...this.filteredData];
        } else {
            dataToFilter = [...this.originalDataSource];
        }
        for (const filter of combinedFilters) {
            dataToFilter = dataToFilter.filter((data) => {
                const cellValue = this.getCellValue(data, columnName);
                if (cellValue !== undefined && cellValue.includes(filter)) {
                    return true; // Include the row if the cell value matches the filter
                }
                return false; // Exclude the row if no match is found or cellValue is undefined
            });
        }
        // Update the data source with the filtered data
        this.dataSource.data = dataToFilter;
        this.filteredData = dataToFilter;

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
        this.departmentApi.getOrgDepartmentList(orgId, '').subscribe((res: ApiResponse<DepartmentVo[]>) => {
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
            this.originalDataSource = [...this.userTypeList]; // Copy the data
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
        this._addEditUserItem(userType.userType);
    }
    /* ************************************* Private Methods ******************************************** */
    private _init(): void {
        this._resetSection();
        this.showSectionUserTypeList = true;
        this._getUserTypeList();
        this._getDepartmentList();
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

    private getCellValue(data: UserTypeDetailDto, columnName: any): any | undefined {
        if (columnName === 'userTypeCode' && data.userType?.code) {
            return data.userType.code.toLowerCase();
        } else if (columnName === 'departmentName' && data.departmentName) {
            return data.departmentName.toLowerCase();
        }
        else if (columnName === 'userTypeName' && data.userType?.name) {
            return data.userType.name.toLowerCase();
        }
        return undefined;
    }

}
