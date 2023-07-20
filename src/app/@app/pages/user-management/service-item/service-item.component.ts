import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddressVo, ApiResponse, ApiRunStatus,ItemVo,  AclVo, OrgVo, ROLE, ROLE_NAME, ResponseStatus, UserEmpDto, UserVo } from 'aayam-clinic-core';
import { APP_CONST } from 'src/app/@app/const/app.const';
import { ORG_STATUS } from 'src/app/@app/const/org-status.const';
import { OrgApi } from 'src/app/@app/service/remote/org.api';
import { ServiceItemApi } from 'src/app/@app/service/remote/service-item.api';
import { UiActionDto } from 'src/app/@shared/dto/ui-action.dto';
import { GlobalEmitterService } from 'src/app/@shared/service/global-emitter.service';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';

@Component({
  selector: 'app-service-item',
  templateUrl: './service-item.component.html',
  styleUrls: ['./service-item.component.scss'],

})
export class ServiceItemComponent implements OnInit {

  /* ************************************* Static Field ********************************************* */
  /* ************************************* Instance Field ******************************************** */
  showSectionServiceItemList!: boolean;
  showSectionServiceItemDetail!: boolean;
  showSectionServiceItemEdit!: boolean;

  serviceItemList!: Array<ItemVo> | null;
  serviceItem!: ItemVo;

  invalidFormServiceItem!: boolean;


  displayedColumns: string[] = ['image', 'name', 'doctor name', 'price', 'description', 'action'];
  dataSource!: MatTableDataSource<ItemVo>;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  /* ************************************* Constructors ******************************************** */
  constructor(
    private serviceItemApi: ServiceItemApi,
    private keyValueStorageService: KeyValueStorageService,
    private globalEmitterService: GlobalEmitterService,
  ){ } 

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
    this.showSectionServiceItemList = true;
  }

//   public formatPhoneNumber(cell: string): string {
//     // TODO: Add phone util in npm
//     return cell;
//   }

  public manageOrg(serviceItem: ItemVo): void { 
    this.keyValueStorageService.saveServiceItemId(serviceItem._id);
    this.keyValueStorageService.saveServiceItem(serviceItem);
    this.globalEmitterService.emitAclChangedEmitter();
  }

  public addOrg(): void {
    const orgId = this.keyValueStorageService.getOrgId();
    const serviceItem = {} as ItemVo;
    serviceItem.active = true;
    
   
    
    this._addEditOrg(serviceItem);
  }

  public formChangeServiceItem(event: UiActionDto<boolean>): void {
    switch (event.action) {
      case 'CHANGE_FORM_SERVICE_ITEM':
        this.invalidFormServiceItem = event.data;
        break;
    }
  }

  public saveServiceItem(): void {
    console.log("xx",this.serviceItem)
    const orgId = this.keyValueStorageService.getOrgId();
    this.serviceItemApi.addUpdateServiceItem(this.serviceItem).subscribe((res: ApiResponse<ItemVo>) => {
    //   if (res.status == ResponseStatus[ResponseStatus.SUCCESS]) {
        console.log("xxx",res.status)
        // this._init();
    //   }
    });
  }

  /* ************************************* Private Methods ******************************************** */
  private _init(): void {
    this._resetSection();
    // this.showSectionServiceItemList = true;
    this._getServiceItemList();
  }

  private _resetSection(): void {
    this.showSectionServiceItemList = false;
    this.showSectionServiceItemDetail = false;
    this.showSectionServiceItemEdit = false;
  }


  private _getServiceItemList(): void {
    // console.log("vvvv");
    this.showSectionServiceItemList = true;
    this.serviceItemList = null;
    const serviceItemId = this.keyValueStorageService.getOrgId();
    if (!serviceItemId) {
      return;
    }
    console.log(",,,",serviceItemId);
    this.serviceItemApi.getServiceItemList(serviceItemId).subscribe((apiResponse: ApiResponse<ItemVo[]>) => {
      this.serviceItemList = apiResponse.body ?? [] as Array<ItemVo>;
      this._initServiceItemTable(this.serviceItemList);
    });
  }

  private _initServiceItemTable(serviceItemList: Array<ItemVo>): void {
    this.dataSource = new MatTableDataSource(serviceItemList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private _addEditOrg(serviceItem: ItemVo): void {
    this.serviceItem = serviceItem;
    this._resetSection();
    this.showSectionServiceItemEdit = true;
  }
}

