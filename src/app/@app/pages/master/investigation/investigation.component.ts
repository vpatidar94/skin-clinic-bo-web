import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse, BOOKING_TYPE_NAME, DEPT, DepartmentVo, InvestigationGroupVo, InvestigationParamVo, ItemVo, ResponseStatus, ServiceTypeVo } from 'aayam-clinic-core';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { InvestigationApi } from 'src/app/@app/service/remote/investigation.api';
import { DepartmentApi } from 'src/app/@app/service/remote/department.api';
import { ServiceItemApi } from 'src/app/@app/service/remote/service-item.api';
import { APP_CONST } from 'src/app/@app/const/app.const';
import { ResponseStatusConst } from 'src/app/@shared/const/response-status-const';

export interface PeriodicElement {
  testCode: string;
  testName: string;
  department: any;
  specimenType: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { testCode: "001", testName: 'CBC', department: 'Pathology', specimenType: 'Blood', },
  { testCode: "002", testName: 'USG - Whole Abdomen', department: 'USG', specimenType: '-', },
  { testCode: "003", testName: 'MRI-Brain', department: 'MRI', specimenType: '-', },

]

@Component({
  selector: 'app-investigation',
  styleUrls: ['./investigation.component.scss'],
  templateUrl: './investigation.component.html',
})

export class InvestigationComponent implements AfterViewInit, OnInit {

  /* ************************************* Static Field ********************************************* */
  /* ************************************* Instance Field ******************************************** */
  showSectionInvestigationList!: boolean;
  showSectionInvestigationEdit!: boolean;

  item!: ItemVo;

  displayedColumns: string[] = ['testCode', 'testName', "department", 'specimenType', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  departmentList!: DepartmentVo[];

  itemList!: ItemVo[];

  serviceTypeList!: ServiceTypeVo[];


  /* ************************************* Constructors ******************************************** */
  constructor(private keyValueStorageService: KeyValueStorageService,
    private investigationApi: InvestigationApi,
    private itemApi: ServiceItemApi,
    private departmentApi: DepartmentApi,
    private serviceItemApi: ServiceItemApi) { }

  /* ************************************* Public Methods ******************************************** */
  public ngAfterViewInit() {
    this.paginator.showFirstLastButtons = false;
    this.paginator.hidePageSize = false;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public addInvestigation(): void {
    const item = {} as ItemVo;
    item.investigationParam = {} as InvestigationParamVo;
    item.investigationParam.params = [{
      name: '',
      criteriaList: [{
        testName: "",
        ref: "",
        unit: ""
      }],
      gender: [],
      ageGroup: '',
    }] as InvestigationGroupVo[];
    const orgId = this.keyValueStorageService.getOrgId();
    if (orgId) {
      item.orgId = orgId;
      item.brId = orgId;
    }
    const dept = this.departmentList?.find(dep => dep.name === APP_CONST.PATHOLOGY) as DepartmentVo;
    item.departmentId = dept._id;
    const serviceType = this.serviceTypeList.find(st => st.name == APP_CONST.INVESTIGATION) as ServiceTypeVo;
    item.serviceTypeId = serviceType._id;
    this._addEditInvestigation(item);
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

  public cancel(): void {
    this._init();
  }

  public addUpdateItem(): void {
    this.itemApi.addUpdateServiceItem(this.item).subscribe((res: ApiResponse<ItemVo>) => {
      if (res.status === ResponseStatusConst.SUCCESS) {
        this.item = res.body as ItemVo;
        this._init();
      }
    });
  }

  public _getDepartmentList() {
    const orgId = this.keyValueStorageService.getOrgId();
    if (!orgId) {
      return;
    }
    this.departmentApi.getOrgDepartmentList(orgId, DEPT.PATIENT_RELATED).subscribe((res: ApiResponse<DepartmentVo[]>) => {
      this.departmentList = res.body ?? [] as DepartmentVo[];
      this._getInvestigationList();

    })
  }

  public _getServiceTypeList(): void {
    const orgId = this.keyValueStorageService.getOrgId();
    if (!orgId) {
      return;
    }
    this.serviceItemApi.getServiceTypeList(orgId).subscribe((res: ApiResponse<ServiceTypeVo[]>) => {
      this.serviceTypeList = res.body ?? [] as ServiceTypeVo[];
    })
  }


  public _getInvestigationList() {
    const orgId = this.keyValueStorageService.getOrgId();
    if (!orgId) {
      return;
    }
    this.itemApi.getInvestigationServiceItemList(orgId).subscribe((res: ApiResponse<ItemVo[]>) => {
      this.itemList = res.body ?? [] as any[];
      this.dataSource = new MatTableDataSource(this.itemList);
    })
  }

  public editInvestigation(item: ItemVo): void {
    this._addEditInvestigation(item);
  }

  public deleteItem(itemId: string): void {
    this.serviceItemApi.deleteByItemId(itemId).subscribe(() => {
      this._init();
    });
  }

  /* ************************************* Private Methods ******************************************** */
  private addingDepartmentName: { [departmentId: string]: string } = {};


  private _init(): void {
    this._resetSection();
    this.showSectionInvestigationList = true;
    this._getDepartmentList();
    this._getInvestigationList();
    this._getServiceTypeList();
  }

  private _resetSection(): void {
    this.showSectionInvestigationList = false;
    this.showSectionInvestigationEdit = false;
  }

  private _addEditInvestigation(item: ItemVo): void {
    this.item = item;
    this._resetSection();
    this.showSectionInvestigationEdit = true;
  }

  public getDepartmentName(row: ItemVo): string {
    const departmentId = row.departmentId;
    const department = this.departmentList?.find(dep => dep._id === departmentId);
    return department ? department.name : '';
  }

}


