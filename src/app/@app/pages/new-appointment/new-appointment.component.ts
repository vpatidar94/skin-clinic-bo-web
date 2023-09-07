import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { ServiceItemApi } from '../../service/remote/service-item.api';
import { ApiResponse, ItemDetailDto, ResponseStatus, UserVo } from 'aayam-clinic-core';
import { UserApi } from '../../service/remote/user.api';
import { SUB_ROLE } from '../../const/sub-role.const';

export interface PeriodicElement {
  appNo: number;
  name: string;
  date: any;
  time: string;
  doctor: string;
  consultationFor: string;
  action: string;
  showInputFields?: boolean;
}

export interface fetchBookingCriterionDto {
  startDate: any;
  endDate: any;
  doctorId: any;
  departmentId: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { appNo: 1, name: 'Rahul Dongre', date: '09/6/2023', time: '12:00-12:10', doctor: "Dr Ramesh Mahajan", consultationFor:"normal checkup", action: "add appointment | delete", },
  { appNo: 2, name: 'Abhay Singh', date: '09/6/2023', time: '11:30-11:40', doctor: "Dr Ram Shrivastava", consultationFor:"normal checkup", action: "add appointment | delete", },
  { appNo: 3, name: 'Sunny Thakur', date: '12/6/2023', time: '01:00-01:10', doctor: "Dr Mayank Patidar", consultationFor:"normal checkup", action: "add appointment | delete", },
  { appNo: 4, name: 'Vishal Pandit', date: '15/6/2023', time: '03:00-03:10', doctor: "Dr Mayur Patidar", consultationFor:"normal checkup", action: "add appointment | delete", },

]

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss']
})

export class NewAppointmentComponent implements OnInit {

  showSectionAppointmentList: boolean = false;
  showSectionAppointmentEdit: boolean = false;

  displayedColumns: string[] = ['appNo', 'name', 'date', "time", "doctor", "consultationFor", "action"];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  serviceItemList!: ItemDetailDto[];
  doctorList!: UserVo[];

  /* ************************************ Constructors ************************************ */
  constructor(private keyValueStorageService: KeyValueStorageService,
    private serviceItemApi: ServiceItemApi,
    private userApi: UserApi,
    ) {
  }

  /* ************************************ Public Methods ************************************ */
  public ngOnInit(): void {
    this._init();
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public addAppointment() {

    this._addEditAppointment();
  }

  public searchTodaysAppointments(): void {
    const filterValue = new Date().toLocaleDateString();
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public searchPreviousAppointments():void {
    

  }

  public cancel(): void {
    this._init();
  }

  /* ************************************ Private Methods ************************************ */
  private _init(): void {
    this._resetSection();
    this.showSectionAppointmentList = true;
    this._getServiceList();
    this._getDoctorList();

  }
  private _resetSection(): void {
    this.showSectionAppointmentList = false;
    this.showSectionAppointmentEdit = false;
  }
  private _addEditAppointment(): void {
    this._resetSection();
    this.showSectionAppointmentEdit = true;
  }

  private _getServiceList(): void {
    const orgId = this.keyValueStorageService.getOrgId();
    if (!orgId) {
      return;
    }
    this.serviceItemApi.getServiceItemList(orgId).subscribe((res: ApiResponse<ItemDetailDto[]>) => {
        if (res.body && res.body?.length > 0) {
          this.serviceItemList = res.body;
      }
    });
  }

  private _getDoctorList(): void {
    const orgId = this.keyValueStorageService.getOrgId();
    if (!orgId) {
      return;
    }
    this.userApi.getDoctorList(orgId, SUB_ROLE.DOCTOR).subscribe((res: ApiResponse<UserVo[]>) => {
        if (res.body && res.body?.length > 0) {
          this.doctorList = res.body;
        }
      }
    );
  }

}