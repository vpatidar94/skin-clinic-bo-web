import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddressVo, ApiResponse, ApiRunStatus, OrgVo, ResponseStatus } from 'aayam-clinic-core';
import { APP_CONST } from 'src/app/@app/const/app.const';
import { ORG_STATUS } from 'src/app/@app/const/org-status.const';
import { OrgApi } from 'src/app/@app/service/remote/org.api';
import { UiActionDto } from 'src/app/@shared/dto/ui-action.dto';
import { GlobalEmitterService } from 'src/app/@shared/service/global-emitter.service';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';

@Component({
  selector: 'app-org',
  templateUrl: './org.component.html',
  styleUrls: ['./org.component.scss']
})
export class OrgComponent implements OnInit {

  /* ************************************* Static Field ********************************************* */
  /* ************************************* Instance Field ******************************************** */
  showSectionOrgList!: boolean;
  showSectionOrgDetail!: boolean;
  showSectionOrgEdit!: boolean;

  orgList!: Array<OrgVo> | null;
  org!: OrgVo;

  invalidFormOrg!: boolean;


  displayedColumns: string[] = ['image', 'name', 'type', 'ph', 'email', 'status', 'action'];
  dataSource!: MatTableDataSource<OrgVo>;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  /* ************************************* Constructors ******************************************** */
  constructor(private orgApi: OrgApi,
    private keyValueStorageService: KeyValueStorageService,
    private globalEmitterService: GlobalEmitterService
  ) { }

  /* ************************************* Public Methods ******************************************** */
  public ngOnInit(): void {
    this._init();
  }

  public applyFilter(filterValue: any): void {
    this.dataSource.filter = filterValue.value.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public cancel(): void {
    this._resetSection();
    this.showSectionOrgList = true;
  }

  public formatPhoneNumber(cell: string): string {
    // TODO: Add phone util in npm
    return cell;
  }

  public manageOrg(org: OrgVo): void { 
    this.keyValueStorageService.saveOrgId(org._id);
    this.keyValueStorageService.saveOrg(org);
    this.globalEmitterService.emitAclChangedEmitter();
  }

  public addOrg(): void {
    const org = {} as OrgVo;
    org.created = new Date();
    org.address = ({} as AddressVo);
    org.appId = APP_CONST.CLINIC;
    org.appName = APP_CONST.CLINIC;
    org.status = ORG_STATUS.ACTIVE;
    this._addEditOrg(org);
  }

  public formChangeOrg(event: UiActionDto<boolean>): void {
    switch (event.action) {
      case 'CHANGE_FORM_ORG':
        this.invalidFormOrg = event.data;
        break;
    }
  }

  public saveOrg(): void {
    this.orgApi.addUpdateOrg(this.org).subscribe((res: ApiResponse<OrgVo>) => {
      if (res.status == ResponseStatus[ResponseStatus.SUCCESS]) {
        this._init();
      }
    });
  }

  /* ************************************* Private Methods ******************************************** */
  private _init(): void {
    this._resetSection();
    this._getOrgList();
  }

  private _resetSection(): void {
    this.showSectionOrgList = false;
    this.showSectionOrgDetail = false;
    this.showSectionOrgEdit = false;
  }


  private _getOrgList(): void {
    this.showSectionOrgList = true;
    this.orgList = null
    this.orgApi.getOrgList().subscribe((apiResponse: ApiResponse<OrgVo[]>) => {
      this.orgList = apiResponse.body ?? [] as Array<OrgVo>;
      this._initOrgTable(this.orgList);
    });
  }

  private _initOrgTable(orgList: Array<OrgVo>): void {
    this.dataSource = new MatTableDataSource(orgList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private _addEditOrg(org: OrgVo): void {
    this.org = org;
    this._resetSection();
    this.showSectionOrgEdit = true;
  }
}

