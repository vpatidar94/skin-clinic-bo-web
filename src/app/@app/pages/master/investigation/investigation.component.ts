import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse, BOOKING_TYPE_NAME, DEPT, DepartmentVo, InvestigationGroupVo, InvestigationParamVo, ItemVo, ResponseStatus } from 'aayam-clinic-core';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { InvestigationApi } from 'src/app/@app/service/remote/investigation.api';
import { DepartmentApi } from 'src/app/@app/service/remote/department.api';
import { ServiceItemApi } from 'src/app/@app/service/remote/service-item.api';

export interface ExtendedServiceTypeDto extends ItemVo {
  departmentName: string;    // For Department
}

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


  /* ************************************* Constructors ******************************************** */
  constructor(private keyValueStorageService: KeyValueStorageService,
    private investigationApi: InvestigationApi,
    private itemApi: ServiceItemApi,
    private departmentApi: DepartmentApi) { }

  /* ************************************* Public Methods ******************************************** */
  public ngAfterViewInit() {
    this.paginator.showFirstLastButtons = false;
    this.paginator.hidePageSize = false;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public addInvestigation(): void {
    const item = {} as ItemVo;
    // item.investigationParam = {} as InvestigationParamVo;
    // item.investigationParam.params = [] as InvestigationGroupVo[];
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

  public savingInvestigationParameters(): void {
    // this.itemApi.addUpdateInvestigation(this.investigationParameters).subscribe((res: ApiResponse<InvestigationParamVo>) => {
    //   if (res.status === ResponseStatus[ResponseStatus.SUCCESS] && res.body) {
    //     this.investigationParameters = res.body
    //     this._init();
    //   }
    // });
  }

  public _getDepartmentList() {
    const orgId = this.keyValueStorageService.getOrgId();
    if (!orgId) {
      return;
    }
    this.departmentApi.getOrgDepartmentList(orgId, DEPT.PATIENT_RELATED).subscribe((res: ApiResponse<DepartmentVo[]>) => {
      this.departmentList = res.body ?? [] as DepartmentVo[];

      /**to show departmentName via departmentId as department name is not in the interface **/
      this.addingDepartmentName = {};
      this.departmentList.forEach(department => {
        this.addingDepartmentName[department._id] = department.name;
      });
      this._getInvestigationList();

    })
  }

  public _getInvestigationList() {
    const orgId = this.keyValueStorageService.getOrgId();
    if (!orgId) {
      return;
    }
    this.itemApi.getInvestigationServiceItemList(orgId).subscribe((res: ApiResponse<any[]>) => {
      this.itemList = res.body ?? [] as any[];
      // this.dataSource = new MatTableDataSource(this.investigationList);
      this.dataSource = new MatTableDataSource(this.itemList);
    })
  }

  public editInvestigation(item: ItemVo): void {
    this._addEditInvestigation(item);
  }

  /* ************************************* Private Methods ******************************************** */
  private addingDepartmentName: { [departmentId: string]: string } = {};


  private _init(): void {
    this._resetSection();
    this.showSectionInvestigationList = true;
    this._getDepartmentList();
    this._getInvestigationList();
  }

  private _resetSection(): void {
    this.showSectionInvestigationList = false;
    this.showSectionInvestigationEdit = false;
  }

  private _addEditInvestigation(item: ItemVo): void {
    this.item = item;
    this._resetSection();
    this.showSectionInvestigationEdit = true;
    console.log('item in _addEditInvestigation:', item);
  }


  // private extendServiceTypeList(investigationList: any[], addingDepartmentName: { [departmentId: string]: string }): any[] {
  //   return investigationList.map(investigation => {
  //     return {
  //       ...investigation,
  //       departmentName: addingDepartmentName[investigation.departmentId]
  //     };
  //   });
  // }

}


