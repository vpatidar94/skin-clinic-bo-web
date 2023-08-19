import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AddServiceTypeVo } from 'src/app/@shared/dto/add-service-type.dto';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse, DepartmentVo, ResponseStatus, ServiceTypeVo } from 'aayam-clinic-core';
import { ServiceItemApi } from 'src/app/@app/service/remote/service-item.api';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { DepartmentApi } from 'src/app/@app/service/remote/department.api';

export interface PeriodicElement {
  SerialNo: number;
  ServiceType: string;
  DoctorsName: string;
  Department: string;
  Action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { SerialNo: 1, ServiceType: 'OPD', DoctorsName: 'Dr.Mayank Patidar', Department: '1120', Action: "Edit | Delete" },
  { SerialNo: 2, ServiceType: 'Dressing', DoctorsName: 'Dr.aayam', Department: '1120', Action: "Edit | Delete" },
  { SerialNo: 3, ServiceType: '', DoctorsName: 'Dr.Atharv', Department: '11:20', Action: "Edit | Delete" },
  { SerialNo: 4, ServiceType: '', DoctorsName: 'Dr.Aman', Department: '1120', Action: "Edit | Delete" },
  { SerialNo: 5, ServiceType: 'z', DoctorsName: 'Dr.aayam', Department: '1120', Action: "Edit | Delete" },
  { SerialNo: 6, ServiceType: '', DoctorsName: 'Dr.Atharv', Department: '1120', Action: "Edit | Delete" },
  { SerialNo: 7, ServiceType: 'kat', DoctorsName: 'Dr.Aman', Department: '1120', Action: "Edit | Delete" },
]
@Component({
  selector: 'app-servicetype',
  styleUrls: ['./service-type.component.scss'],
  templateUrl: './service-type.component.html',
})

export class ServiceTypeComponent implements AfterViewInit, OnInit {

  /* ************************************* Static Field ********************************************* */
  /* ************************************* Instance Field ******************************************** */
  showSectionServiceTypeList!: boolean;
  showSectionServiceTypeEdit!: boolean;

  displayedColumns: string[] = ['Serial No', 'Service Type', 'DoctorsName', "Department", "Action"];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  addServiceType!: AddServiceTypeVo;
  departmentList!: DepartmentVo[];
  serviceTypeList!: ServiceTypeVo[];
  // ...........................
  serviceType!: ServiceTypeVo
  // ............................

  /* ************************************* Constructors ******************************************** */
  constructor(private serviceItemApi: ServiceItemApi,
    private keyValueStorageService: KeyValueStorageService,
    private departmentApi: DepartmentApi) { }

  /* ************************************* Public Methods ******************************************** */

  public ngAfterViewInit() {
    this.paginator.showFirstLastButtons = false;
    this.paginator.hidePageSize = false;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public addServiceTypeSection(): void {
    const ServiceItem = {} as AddServiceTypeVo;
    ServiceItem.department = " ";
    ServiceItem.drAssociated = "yes";
    ServiceItem.serviceType = " ";
    this.addServiceType = ServiceItem;

    const serviceTypeDetails = {} as ServiceTypeVo;
    const orgId = this.keyValueStorageService.getOrgId();
    if (orgId) {
        serviceTypeDetails.orgId = orgId;
        serviceTypeDetails.brId = orgId;
    }
    serviceTypeDetails.name = "";
    serviceTypeDetails.departmentId = "";

    this._addEditServiceItem(serviceTypeDetails);
    this._getDepartmentList();

    // this._addEditServiceItem();
  }

  public _getServiceTypeList(): void {
   
      const orgId = this.keyValueStorageService.getOrgId();
      if (!orgId) {
          return;
      }
      this.serviceItemApi.getServiceTypeList(orgId).subscribe((res: ApiResponse<ServiceTypeVo[]>) => {
          this.serviceTypeList = res.body ?? [] as ServiceTypeVo[];
          // this.dataSource = new MatTableDataSource(this.serviceTypeList);
          console.log("serviceTypeList",this.serviceTypeList);
      })
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

  public _getDepartmentList() {
    const orgId = this.keyValueStorageService.getOrgId();
    if (!orgId) {
        return;
    }
    this.departmentApi.getOrgDepartmentList(orgId).subscribe((res: ApiResponse<DepartmentVo[]>) => {
        this.departmentList = res.body ?? [] as DepartmentVo[];
    })
} 

  public savingServiceType(): void {
    this.serviceItemApi.addUpdateServiceType(this.serviceType).subscribe((res: ApiResponse<ServiceTypeVo>) => {
      if (res.status === ResponseStatus[ResponseStatus.SUCCESS] && res.body) {
          this.serviceType = res.body;
          this._init();
          console.log("servicekkkk",this.serviceType);
      }
  });
    
  }

  public cancel(): void {
    this._init();
  }

  /* ************************************* Private Methods ******************************************** */

  private _init(): void {
    this._resetSection();
    this.showSectionServiceTypeList = true;
    this._getServiceTypeList();
  }

  private _resetSection(): void {
    this.showSectionServiceTypeList = false;
    this.showSectionServiceTypeEdit = false;
  }

  private _addEditServiceItem(serviceTypeDetails:ServiceTypeVo): void {
    this.serviceType = serviceTypeDetails;
    this._resetSection();
    this.showSectionServiceTypeEdit = true;
  }

}


