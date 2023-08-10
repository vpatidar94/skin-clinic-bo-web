import { AfterViewInit, Component, OnInit, ViewChild, } from '@angular/core';
import { ApiResponse, DepartmentVo, ResponseStatus, } from 'aayam-clinic-core';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { MatSort, } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddDepartmentVo } from 'src/app/@shared/dto/add-department.dto';
import { DepartmentApi } from 'src/app/@app/service/remote/department.api';

const ELEMENT_DATA: AddDepartmentVo[] = [
    { departmentCode: 1, departmentName: 'OPD', action: "Edit | Delete" },
    { departmentCode: 2, departmentName: 'Dressing', action: "Edit | Delete" },
    { departmentCode: 3, departmentName: 'Blood Test', action: "Edit | Delete" },
    { departmentCode: 4, departmentName: '', action: "Edit | Delete" },
]
@Component({
    selector: 'app-add-department',
    templateUrl: './add-department.component.html',
    styleUrls: ['./add-department.component.scss'],
})

export class AddDepartmentComponent implements AfterViewInit, OnInit {

    /* ************************************* Static Field ********************************************* */
    /* ************************************* Instance Field ******************************************** */
    // department!: Array<AddDepartmentVo>; //to show the content of ELEMENT_DATA
    department!: DepartmentVo;

    departmentList!: DepartmentVo[];

    resultsLength = 0;

    showAddDepartmentSection: boolean = false;
    toggleAddProductsSection() {
        console.log('Toggle function called');
        this.showAddDepartmentSection = !this.showAddDepartmentSection;
    }

    // newly added to show table
    displayedColumns: string[] = ['departmentCode', 'departmentName', "action"];
    dataSource = new MatTableDataSource<AddDepartmentVo>(ELEMENT_DATA);

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
        this.department = departmentDetails;
        this._init();
    }

    public _getDepartmentList() {
        const orgId = this.keyValueStorageService.getOrgId();
        if (!orgId) {
            return;
        }
        this.departmentApi.getOrgDepartmentList(orgId).subscribe((res: ApiResponse<DepartmentVo[]>) => {
            this.departmentList = res.body ?? [] as DepartmentVo[];
            this.resultsLength = this.departmentList.length;
            //   this._initBookingTable(this.bookingList);
        })
    }

    public saveIt(): void {
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
