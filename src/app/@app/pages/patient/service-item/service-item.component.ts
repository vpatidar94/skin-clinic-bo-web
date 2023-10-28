import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse, ItemDetailDto, ItemVo, ResponseStatus, UserVo } from 'aayam-clinic-core';
import { SUB_ROLE } from 'src/app/@app/const/sub-role.const';
import { ServiceItemApi } from 'src/app/@app/service/remote/service-item.api';
import { UserApi } from 'src/app/@app/service/remote/user.api';
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

  serviceItemList!: Array<ItemDetailDto> | null;
  serviceItem!: ItemVo;

  invalidFormServiceItem!: boolean;
  doctorList!: Array<UserVo>;


  displayedColumns: string[] = ['image', 'name', 'doctor name', 'price', 'description', 'action'];
  dataSource!: MatTableDataSource<ItemDetailDto>;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  /* ************************************* Constructors ******************************************** */
  constructor(
    private userApi: UserApi,
    private serviceItemApi: ServiceItemApi,
    private keyValueStorageService: KeyValueStorageService,
    private globalEmitterService: GlobalEmitterService,
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
    this.showSectionServiceItemList = true;
  }

  public editOrg(serviceItem: ItemDetailDto): void {
    this._addEditOrg(serviceItem.item);
  }

  public addOrg(): void {
    const orgId = this.keyValueStorageService.getOrgId();
    const serviceItem = {} as ItemVo;
    if (orgId) {
      serviceItem.orgId = orgId;
      serviceItem.brId = orgId;
    }
    // serviceItem.active = true;
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
    const orgId = this.keyValueStorageService.getOrgId();
    this.serviceItemApi.addUpdateServiceItem(this.serviceItem).subscribe((res: ApiResponse<ItemVo>) => {
      if (res.status == ResponseStatus[ResponseStatus.SUCCESS]) {
        this._init();
      }
    });
  }

  /* ************************************* Private Methods ******************************************** */
  private _init(): void {
    this._resetSection();
    this._getServiceItemList();
    this._getDoctorList();
  }

  private _resetSection(): void {
    this.showSectionServiceItemList = false;
    this.showSectionServiceItemDetail = false;
    this.showSectionServiceItemEdit = false;
  }

  private _getServiceItemList(): void {
    this.showSectionServiceItemList = true;
    this.serviceItemList = null;
    const serviceItemId = this.keyValueStorageService.getOrgId();
    if (!serviceItemId) {
      return;
    }
    this.serviceItemApi.getServiceItemList(serviceItemId).subscribe((apiResponse: ApiResponse<ItemDetailDto[]>) => {
      this.serviceItemList = apiResponse.body ?? [] as Array<ItemDetailDto>;
      this._initServiceItemTable(this.serviceItemList);
    });
  }

  private _getDoctorList(): void {
    this.doctorList = [] as Array<UserVo>;
    const orgId = this.keyValueStorageService.getOrgId();
    if (!orgId) {
      return;
    }
    this.userApi.getDoctorList(orgId, SUB_ROLE.DOCTOR).subscribe((apiResponse: ApiResponse<UserVo[]>) => {
      this.doctorList = apiResponse.body ?? [] as Array<UserVo>;
    });
  }

  private _initServiceItemTable(serviceItemList: Array<ItemDetailDto>): void {
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

