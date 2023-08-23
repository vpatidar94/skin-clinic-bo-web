import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceItemApi } from 'src/app/@app/service/remote/service-item.api';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { DepartmentApi } from 'src/app/@app/service/remote/department.api';
import { ApiResponse, DepartmentVo, ItemDetailDto, ItemVo, PercentFlatVo, ResponseStatus, ServiceTypeVo, UserVo } from 'aayam-clinic-core';
import { UserApi } from 'src/app/@app/service/remote/user.api';
import { SUB_ROLE } from 'src/app/@app/const/sub-role.const';

@Component({
    selector: 'app-services',
    styleUrls: ['./services.component.scss'],
    templateUrl: './services.component.html',
})

export class ServicesComponent implements AfterViewInit, OnInit {

    /* ************************************* Static Field ********************************************* */
    /* ************************************* Instance Field ******************************************** */
    serviceTypeList!: ServiceTypeVo[];
    serviceItem!: ItemVo;
    serviceItemList!: Array<ItemDetailDto> | null
    departmentList!: DepartmentVo[];
    doctorList!: UserVo[];

    showSectionServiceList!: boolean;
    showSectionServiceEdit!: boolean;

    displayedColumns: string[] = ['Service Code', 'Service Name', 'Service Type', 'Doctors Name', "Fee", "Action"];
    dataSource!: MatTableDataSource<ItemDetailDto>;

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

    public applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    public savingService(): void {
        this.serviceItemApi.addUpdateServiceItem(this.serviceItem).subscribe((res: ApiResponse<ItemVo>) => {
            if (res.status == ResponseStatus[ResponseStatus.SUCCESS]) {
                this._init();
            }
        });
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
            /* ****to get serviceType name via serviceTypeId ******/
            this.addingServiceTypeName = {};
            this.serviceTypeList.forEach(serviceType => {
                this.addingServiceTypeName[serviceType._id] = serviceType.name;
            });
            this._getServiceItemList();
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
            /* ****to get associate doctor name via associatedDoctorId ******/
            this.addingAssociatedDoctorName = {};
            this.doctorList.forEach(associatedDoctor => {
                this.addingAssociatedDoctorName[associatedDoctor._id] = `${associatedDoctor.nameF} ${associatedDoctor.nameL}`;
            });
            this._getServiceItemList();
        });
    }

    private _getServiceItemList(): void {
        this.showSectionServiceList = true;
        this.serviceItemList = null;
        const serviceItemId = this.keyValueStorageService.getOrgId();
        if (!serviceItemId) {
            return;
        }
        this.serviceItemApi.getServiceItemList(serviceItemId).subscribe((apiResponse: ApiResponse<ItemDetailDto[]>) => {
            this.serviceItemList = apiResponse.body ?? [] as Array<ItemDetailDto>;
            /* ****to get the names in the table in using ids as name are not in the interface ******/
            const extendedList = this.extendServiceItemList(this.serviceItemList, this.addingServiceTypeName, this.addingAssociatedDoctorName);
            this.dataSource = new MatTableDataSource(extendedList);
            // this.dataSource = new MatTableDataSource(this.serviceItemList);
        });
    }

    private _init(): void {
        this.dataSource = new MatTableDataSource<ItemDetailDto>([]);
        this._resetSection();
        this.showSectionServiceList = true;
        this._getServiceItemList();
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

    private addingServiceTypeName: { [serviceTypeId: string]: string } = {};

    private addingAssociatedDoctorName: { [associatedDoctorId: string]: string | null | undefined } = {};

    /**this method is to include the serviceTypeName and associatedDoctorName externally in the interface to show them in the table */
    private extendServiceItemList(serviceItemList: Array<ItemDetailDto>, addingServiceTypeName: { [serviceTypeId: string]: string }, addingAssociatedDoctorName: { [associatedDoctorId: string]: string | null | undefined }): any[] {
        return serviceItemList.map(serviceItem => {
            return {
                ...serviceItem,
                serviceTypeName: addingServiceTypeName[serviceItem.item.serviceTypeId],
                associatedDoctorName: addingAssociatedDoctorName[serviceItem.item.associatedDoctorId],
            };
        });
    }

}
