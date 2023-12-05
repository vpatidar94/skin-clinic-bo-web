import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse, DepartmentVo, ResponseStatus, ServiceTypeVo } from 'aayam-clinic-core';
import { ServiceItemApi } from 'src/app/@app/service/remote/service-item.api';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { DepartmentApi } from 'src/app/@app/service/remote/department.api';

export interface ExtendedServiceTypeDto extends ServiceTypeVo {
  departmentName: string;    // For Department
}

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

  displayedColumns: string[] = ['serviceCode', 'serviceType', 'doctorAssociated', "department", "action"];
  // dataSource = new MatTableDataSource<ServiceTypeVo>([] as ServiceTypeVo[]);
  dataSource!: MatTableDataSource<ExtendedServiceTypeDto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  serviceType!: ServiceTypeVo
  departmentList!: DepartmentVo[];
  serviceTypeList!: ServiceTypeVo[];

  columnFilters: { [key: string]: string } = {};
  originalDataSource: ExtendedServiceTypeDto[] = [];
  filteredData: ExtendedServiceTypeDto[] = [];

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

  }

  public _getServiceTypeList(): void {
    const orgId = this.keyValueStorageService.getOrgId();
    if (!orgId) {
      return;
    }
    this.serviceItemApi.getServiceTypeList(orgId).subscribe((res: ApiResponse<ServiceTypeVo[]>) => {
      this.serviceTypeList = res.body ?? [] as ServiceTypeVo[];
      const extendedList = this.extendServiceTypeList(this.serviceTypeList, this.addingDepartmentName);
      this.dataSource = new MatTableDataSource(extendedList);
      this.originalDataSource = [...extendedList];

    })
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
    let dataToFilter: ExtendedServiceTypeDto[];
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

  public _getDepartmentList() {
    const orgId = this.keyValueStorageService.getOrgId();
    if (!orgId) {
      return;
    }
    this.departmentApi.getOrgDepartmentList(orgId, "").subscribe((res: ApiResponse<DepartmentVo[]>) => {
      this.departmentList = res.body ?? [] as DepartmentVo[];
      /**to show departmentName via departmentId as department name is not in the interface **/
      this.addingDepartmentName = {};
      this.departmentList.forEach(department => {
        this.addingDepartmentName[department._id] = department.name;
      });
      this._getServiceTypeList();
    })
  }

  public savingServiceType(): void {
    this.serviceItemApi.addUpdateServiceType(this.serviceType).subscribe((res: ApiResponse<ServiceTypeVo>) => {
      if (res.status === ResponseStatus[ResponseStatus.SUCCESS] && res.body) {
        this.serviceType = res.body;
        this._init();
      }
    });
  }

  public cancel(): void {
    this._init();
  }

  public editServiceType(serviceType: ServiceTypeVo): void {
    this.serviceType = { ...serviceType };
    this._addEditServiceItem(this.serviceType);
  }

  getYesNoValue(value: boolean): string {
    return value ? 'Yes' : 'No';
  }

  /* ************************************* Private Methods ******************************************** */
  private _init(): void {
    this._resetSection();
    this.showSectionServiceTypeList = true;
    this._getServiceTypeList();
    this._getDepartmentList();
  }

  private _resetSection(): void {
    this.showSectionServiceTypeList = false;
    this.showSectionServiceTypeEdit = false;
  }

  private _addEditServiceItem(serviceTypeDetails: ServiceTypeVo): void {
    this.serviceType = serviceTypeDetails;
    this._resetSection();
    this.showSectionServiceTypeEdit = true;
  }

  private addingDepartmentName: { [departmentId: string]: string } = {};

  /**to extend ServiceList to add departmentName in it via departmentId as department name is not in the interface ServiceTypeVo **/
  private extendServiceTypeList(serviceTypeList: ServiceTypeVo[], addingDepartmentName: { [departmentId: string]: string }): any[] {
    return serviceTypeList.map(serviceType => {
      return {
        ...serviceType,
        departmentName: addingDepartmentName[serviceType.departmentId]
      };
    });
  }

  private getCellValue(data: ExtendedServiceTypeDto, columnName: any): any | undefined {
    if (columnName === 'serviceCode' && data.code) {
      return data.code.toLowerCase();
    } else if (columnName === 'serviceType' && data.name) {
      return data.name.toLowerCase();
    }
    else if (columnName === 'department' && data.departmentName) {
      return data.departmentName.toLowerCase();
    }
    else if (columnName === 'doctorsName' && data.doctorAssociated) {
      return data.doctorAssociated;
    }
    return undefined;
  }

}


