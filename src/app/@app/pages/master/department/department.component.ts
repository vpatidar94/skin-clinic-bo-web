import { AfterViewInit, Component, OnInit, ViewChild, } from '@angular/core';
import { ApiResponse, DepartmentVo, ResponseStatus, } from 'aayam-clinic-core';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { MatSort, } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmentApi } from 'src/app/@app/service/remote/department.api';

@Component({
    selector: 'app-department',
    templateUrl: './department.component.html',
    styleUrls: ['./department.component.scss'],
})

export class DepartmentComponent implements AfterViewInit, OnInit {

    /* ************************************* Static Field ********************************************* */
    /* ************************************* Instance Field ******************************************** */

    department!: DepartmentVo;

    departmentList!: DepartmentVo[];

    resultsLength = 0;

    showAddDepartmentSection: boolean = false;

    

    displayedColumns: string[] = ['createdDate', 'departmentCode', 'departmentName', "action"];
    dataSource = new MatTableDataSource<DepartmentVo>([] as DepartmentVo[]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    /* ************************************* Constructors ******************************************** */
    constructor(private keyValueStorageService: KeyValueStorageService,
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
        const departmentDetails = {} as DepartmentVo;
        const orgId = this.keyValueStorageService.getOrgId();
        if (orgId) {
            departmentDetails.orgId = orgId;
            departmentDetails.brId = orgId;
        }
        departmentDetails.name = "";
        departmentDetails.created = new Date();
        this.department = departmentDetails;
        this._init();
    }
    
    public AddDepartment() {
        this.showAddDepartmentSection = !this.showAddDepartmentSection;
    }
    
    public _getDepartmentList() {
        const orgId = this.keyValueStorageService.getOrgId();
        if (!orgId) {
            return;
        }
        this.departmentApi.getOrgDepartmentList(orgId).subscribe((res: ApiResponse<DepartmentVo[]>) => {
            this.departmentList = res.body ?? [] as DepartmentVo[];
            this.resultsLength = this.departmentList.length;
            this.dataSource = new MatTableDataSource(this.departmentList);
        })
    }

    public savingDepartment(): void {
        this.departmentApi.addUpdateDepartment(this.department).subscribe((res: ApiResponse<DepartmentVo>) => {
            if (res.status === ResponseStatus[ResponseStatus.SUCCESS] && res.body) {
                this.department = res.body
            }
        });
    }

    /* ************************************* Private Methods ******************************************** */
    private _init(): void {
        this._getDepartmentList();
    }

}
