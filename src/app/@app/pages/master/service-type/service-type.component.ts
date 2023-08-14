import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AddServiceTypeVo } from 'src/app/@shared/dto/add-service-type.dto';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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

  /* ************************************* Constructors ******************************************** */
  constructor() { }

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
    this._addEditServiceItem();
  }

  public _getServiceTypeList(): void {
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

  public savingServiceType(): void {
    this._init();
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

  private _addEditServiceItem(): void {
    this._resetSection();
    this.showSectionServiceTypeEdit = true;
  }

}


