import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiResponse, DepartmentVo, ResponseStatus, } from 'aayam-clinic-core';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { UserApi } from 'src/app/@app/service/remote/user.api';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { oldUserTypeVo } from 'src/app/@shared/dto/user-type.dto';
import { UserTypeVo } from 'aayam-clinic-core';
import { DepartmentApi } from 'src/app/@app/service/remote/department.api';

const ELEMENT_DATA: oldUserTypeVo[] = [
    { userTypeCode: 1, userTypeName: 'OPD', department: "", action: "Edit | Delete" },
    { userTypeCode: 2, userTypeName: 'Dressing', department: "", action: "Edit | Delete" },
]

@Component({
    selector: 'app-user-type',
    templateUrl: './user-type.component.html',
    styleUrls: ['./user-type.component.scss'],
})

export class UserTypeComponent implements AfterViewInit, OnInit {

    /* ************************************* Static Field ********************************************* */
    /* ************************************* Instance Field ******************************************** */
    addUserType!: Array<oldUserTypeVo>; // to show ELEMENT_DATA right now...we  will remove it. 
    userType!: UserTypeVo;
    departmentList!: DepartmentVo[];

    showSectionUserTypeList!: boolean;
    showSectionUserTypeEdit!: boolean;

    displayedColumns: string[] = ['userTypeCode', 'userTypeName', 'departmentName', "action"];
    dataSource = new MatTableDataSource<oldUserTypeVo>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    /* ************************************* Constructors ******************************************** */
    constructor(private keyValueStorageService: KeyValueStorageService,
        private userApi: UserApi,
        private departmentApi: DepartmentApi) { }

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
        this.userType = userTypeDetails;

        this._addEditUserItem();
        this._getDepartmentList();
    }

    public _getUserTypeList(): void {
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

    private _addEditUserItem(): void {
        this._resetSection();
        this.showSectionUserTypeEdit = true;
    }


}
