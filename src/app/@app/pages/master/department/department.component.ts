import { AfterViewInit, Component, OnInit, ViewChild, } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse, DEPT_LIST, DEPT_NAME, DepartmentVo, ResponseStatus, } from 'aayam-clinic-core';
import { DepartmentApi } from 'src/app/@app/service/remote/department.api';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';

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

    showSectionDepartmentList!: boolean;
    showSectionDepartmentEdit!: boolean;

    displayedColumns: string[] = ['createdDate', 'departmentCode', 'departmentName', 'type', "action"];
    dataSource = new MatTableDataSource<DepartmentVo>([] as DepartmentVo[]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    columnFilters: { [key: string]: string } = {};

    originalDataSource: DepartmentVo[] = [];
    filteredData: DepartmentVo[] = [];

    departmentName: any = DEPT_NAME;

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

    // public applyFilter(event: Event) {
    //     const filterValue = (event.target as HTMLInputElement).value;
    //     this.dataSource.filter = filterValue.trim().toLowerCase();

    //     if (this.dataSource.paginator) {
    //         this.dataSource.paginator.firstPage();
    //     }
    // }

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
        let dataToFilter: DepartmentVo[];
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

    public addDepartment() {
        const departmentDetails = {} as DepartmentVo;
        const orgId = this.keyValueStorageService.getOrgId();
        if (orgId) {
            departmentDetails.orgId = orgId;
            departmentDetails.brId = orgId;
        }
        departmentDetails.name = "";
        departmentDetails.created = new Date();
        this._addEditDepartment(departmentDetails);
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
            this.originalDataSource = [...this.departmentList];
        })
    }

    public savingDepartment(): void {
        this.departmentApi.addUpdateDepartment(this.department).subscribe((res: ApiResponse<DepartmentVo>) => {
            if (res.status === ResponseStatus[ResponseStatus.SUCCESS] && res.body) {
                this.department = res.body
                this._init();
            }
        });
    }

    public cancel(): void {
        this._init();
    }

    public editDepartment(department: DepartmentVo): void {
        this.department = { ...department };
        this._addEditDepartment(this.department);
        this._getDepartmentList();
    }
    /* ************************************* Private Methods ******************************************** */
    private _init(): void {
        this._resetSection();
        this.showSectionDepartmentList = true;
        this._getDepartmentList();
    }

    private _resetSection(): void {
        this.showSectionDepartmentList = false;
        this.showSectionDepartmentEdit = false;
    }

    private _addEditDepartment(departmentDetails: DepartmentVo): void {
        this.department = departmentDetails;
        this._resetSection();
        this.showSectionDepartmentEdit = true;
    }

    private getCellValue(data: DepartmentVo, columnName: string): string | undefined {

        if (columnName === 'createdDate' && data.created) {
            return data.created.toString();
        }
        if (columnName === 'departmentCode' && data.code) {
            return data.code.toLowerCase();
        }
        if (columnName === 'departmentName' && data.name) {
            return data.name.toLowerCase();
        }
        return undefined;
    }

}
