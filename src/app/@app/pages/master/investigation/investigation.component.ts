import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse, BOOKING_TYPE_NAME, DEPT, DepartmentVo, InvestigationParamVo, ResponseStatus } from 'aayam-clinic-core';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { InvestigationApi } from 'src/app/@app/service/remote/investigation.api';
import { DepartmentApi } from 'src/app/@app/service/remote/department.api';

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

  investigationParameters!: InvestigationParamVo;

  displayedColumns: string[] = ['testCode', 'testName', "department", 'specimenType', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  bookingTypeName: any = BOOKING_TYPE_NAME;

  departmentList!: DepartmentVo[];

  /* ************************************* Constructors ******************************************** */
  constructor(private keyValueStorageService: KeyValueStorageService,
    private investigationApi: InvestigationApi,
    private departmentApi: DepartmentApi) { }

  /* ************************************* Public Methods ******************************************** */

  public ngAfterViewInit() {
    this.paginator.showFirstLastButtons = false;
    this.paginator.hidePageSize = false;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public addInvestigation(): void {
    const investigationParameters = {} as InvestigationParamVo;
    const orgId = this.keyValueStorageService.getOrgId();
        if (orgId) {
            investigationParameters.orgId = orgId;
            investigationParameters.brId = orgId;
        }
    this._addEditServiceItem(investigationParameters);
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
    this.investigationApi.addUpdateInvestigation(this.investigationParameters).subscribe((res: ApiResponse<InvestigationParamVo>) => {
        if (res.status === ResponseStatus[ResponseStatus.SUCCESS] && res.body) {
            this.investigationParameters = res.body
            console.log("XXXXXXXXXBBBBbbbbb",this.investigationParameters)
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
  })
}

  /* ************************************* Private Methods ******************************************** */
  private _init(): void {
    this._resetSection();
    this.showSectionInvestigationList = true;
    this._getDepartmentList();
  }

  private _resetSection(): void {
    this.showSectionInvestigationList = false;
    this.showSectionInvestigationEdit = false;
  }

  private _addEditServiceItem(investigationParameters: InvestigationParamVo): void {
    this.investigationParameters = investigationParameters
    this._resetSection();
    this.showSectionInvestigationEdit = true;
  }

}


