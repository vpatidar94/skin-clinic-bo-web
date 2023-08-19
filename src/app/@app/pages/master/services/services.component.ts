import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AddServiceVo } from 'src/app/@shared/dto/add-service.dto';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceItemApi } from 'src/app/@app/service/remote/service-item.api';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { DepartmentApi } from 'src/app/@app/service/remote/department.api';
import { ApiResponse, DepartmentVo, ItemVo, PercentFlatVo, ResponseStatus, ServiceTypeVo, UserVo } from 'aayam-clinic-core';
import { UserApi } from 'src/app/@app/service/remote/user.api';
import { SUB_ROLE } from 'src/app/@app/const/sub-role.const';

export interface PeriodicElement {
    ServiceCode: number;
    ServiceName: string;
    ServiceType: string;
    DoctorsName: string;
    Fee: string;
    Action: string;
}

// newly added to show table
const ELEMENT_DATA: PeriodicElement[] = [
    { ServiceCode: 1, ServiceName: 'OPD', ServiceType: 'OPD', DoctorsName: 'Dr.Mayank Patidar', Fee: '1120', Action: "Edit | Delete" },
    { ServiceCode: 2, ServiceName: 'Dressing', ServiceType: 'Dressing', DoctorsName: 'Dr.aayam', Fee: '1120', Action: "Edit | Delete" },
    { ServiceCode: 3, ServiceName: 'Blood Test', ServiceType: '', DoctorsName: 'Dr.Atharv', Fee: '11:20', Action: "Edit | Delete" },
    { ServiceCode: 4, ServiceName: '', ServiceType: '', DoctorsName: 'Dr.Aman', Fee: '1120', Action: "Edit | Delete" },
    { ServiceCode: 5, ServiceName: '', ServiceType: 'z', DoctorsName: 'Dr.aayam', Fee: '1120', Action: "Edit | Delete" },
    { ServiceCode: 6, ServiceName: '', ServiceType: '', DoctorsName: 'Dr.Atharv', Fee: '1120', Action: "Edit | Delete" },
    { ServiceCode: 7, ServiceName: '', ServiceType: 'kat', DoctorsName: 'Dr.Aman', Fee: '1120', Action: "Edit | Delete" },
]
@Component({
    selector: 'app-services',
    styleUrls: ['./services.component.scss'],
    templateUrl: './services.component.html',
})

export class ServicesComponent implements AfterViewInit, OnInit {

    /* ************************************* Static Field ********************************************* */
    /* ************************************* Instance Field ******************************************** */
    addService!: AddServiceVo;
    serviceTypeList!: ServiceTypeVo[];
    serviceItem!: ItemVo;
    departmentList!: DepartmentVo[];
    doctorList!: UserVo[];

    showSectionServiceList!: boolean;
    showSectionServiceEdit!: boolean;

    displayedColumns: string[] = ['Service Code', 'Service Name', 'Service Type', 'DoctorsName', "Fee", "Action"];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    /* ************************************* Constructors ******************************************** */
    constructor(private serviceItemApi: ServiceItemApi,
        private keyValueStorageService: KeyValueStorageService,
        private departmentApi: DepartmentApi,
        private userApi: UserApi,) { }

    /* ************************************* Public Methods ******************************************** */
    public ngOnInit(): void {
        this._init();
    }

    public addServiceSection(): void {
        const serviceItem = {} as AddServiceVo;
        serviceItem.serviceCode = '';
        serviceItem.serviceName = '';
        serviceItem.serviceType = '';
        serviceItem.department = '';
        serviceItem.associatedDoctor = '';
        serviceItem.feeType = '';
        serviceItem.fee = 0;
        serviceItem.feeDistribution = '';
        this.addService = serviceItem;

        const newServiceItem = {} as ItemVo;
        newServiceItem.feeType = {} as PercentFlatVo;
        const orgId = this.keyValueStorageService.getOrgId();
        if (orgId) {
            newServiceItem.orgId = orgId;
            newServiceItem.brId = orgId;
        }
        this.serviceItem = newServiceItem;
        this._addEditService();
    }

    public ngAfterViewInit() {
        this.paginator.showFirstLastButtons = false;
        this.paginator.hidePageSize = false;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    public _getServiceList(): void {
    }

    public applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    public savingService(): void {
        const orgId = this.keyValueStorageService.getOrgId();
        this.serviceItemApi.addUpdateServiceItem(this.serviceItem).subscribe((res: ApiResponse<ItemVo>) => {
            if (res.status == ResponseStatus[ResponseStatus.SUCCESS]) {
                console.log("updateservices", this.serviceItem);
            }
        });
        console.log("servciceItemXXXX", this.serviceItem);
    }

    public cancel(): void {
        this._init();
    }

    public _getServiceTypeList(): void {

        const orgId = this.keyValueStorageService.getOrgId();
        if (!orgId) {
            return;
        }
        this.serviceItemApi.getServiceTypeList(orgId).subscribe((res: ApiResponse<ServiceTypeVo[]>) => {
            this.serviceTypeList = res.body ?? [] as ServiceTypeVo[];
            console.log("serviceTypeList", this.serviceTypeList);
        })
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

    /* ************************************* Private Methods ******************************************** */
    private _getDoctorList(): void {
        this.doctorList = [] as Array<UserVo>;
        const orgId = this.keyValueStorageService.getOrgId();
        if (!orgId) {
            return;
        }
        this.userApi.getDoctorList(orgId, SUB_ROLE.DOCTOR).subscribe((apiResponse: ApiResponse<UserVo[]>) => {
            this.doctorList = apiResponse.body ?? [] as Array<UserVo>;
            console.log("doctor", this.doctorList);
        });
    }

    private _init(): void {
        this._resetSection();
        this.showSectionServiceList = true;
        this._getServiceList();
        this._getServiceTypeList();
        this._getDepartmentList();
        this._getDoctorList();
    }

    private _resetSection(): void {
        this.showSectionServiceList = false;
        this.showSectionServiceEdit = false;
    }

    private _addEditService(): void {
        this._resetSection();
        this.showSectionServiceEdit = true;
    }

}
