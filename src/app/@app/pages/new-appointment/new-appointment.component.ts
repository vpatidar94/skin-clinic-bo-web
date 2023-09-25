import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { ServiceItemApi } from '../../service/remote/service-item.api';
import { ApiResponse, BookingVo, ItemDetailDto, ObservationVo, ResponseStatus, UserBookingDto, UserVo, BOOKING_TYPE, BOOKING_TYPE_NAME, KeyValueVo, PrescriptionVo, AddressVo, OrgBookingDto, ProductVo, } from 'aayam-clinic-core';
import { UserApi } from '../../service/remote/user.api';
import { SUB_ROLE } from '../../const/sub-role.const';
import { BookingApi } from '../../service/remote/booking.api';

export interface PeriodicElement {
  appNo: string;
  name: string;
  date: any;
  time: string;
  doctor: string;
  consultationFor: string;
  action: string;
  showInputFields?: boolean;
  [key: string]: any;
}

export interface ColumnWiseFiltersDto {
  [key: string]: string;
  appNo: string;
  name: string;
  date: string;
  time: string;
  doctor: string;
  consultationFor: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { appNo: "1", name: 'Rahul Dongre', date: '09/6/2023', time: '12:00-12:10', doctor: "Dr Ramesh Mahajan", consultationFor:"normal checkup", action: "add appointment | delete", },
  { appNo: "2", name: 'Abhay Singh', date: '09/6/2023', time: '11:30-11:40', doctor: "Dr Ram Shrivastava", consultationFor:"normal checkup", action: "add appointment | delete", },
  { appNo: "3", name: 'Sunny Thakur', date: '12/6/2023', time: '01:00-01:10', doctor: "Dr Mayank Patidar", consultationFor:"normal checkup", action: "add appointment | delete", },
  { appNo: "4", name: 'Vishal Pandit', date: '15/6/2023', time: '03:00-03:10', doctor: "Dr Mayur Patidar", consultationFor:"normal checkup", action: "add appointment | delete", },
  { appNo: "5", name: 'Rahul Dongre', date: '09/6/2023', time: '12:00-12:10', doctor: "Dr Ramesh Mahajan", consultationFor:"normal checkup", action: "add appointment | delete", },
  { appNo: "6", name: 'Rahul Dongre', date: '15/6/2023', time: '12:00-12:10', doctor: "Dr Ramesh Mahajan", consultationFor:"normal checkup", action: "add appointment | delete", },

]

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss']
})

export class NewAppointmentComponent implements OnInit {

  showSectionAppointmentList: boolean = false;
  showSectionAppointmentEdit: boolean = false;


  userBooking!: UserBookingDto;

  orgBooking! : OrgBookingDto;

  resultsLength = 0;
  serviceItemList!: ItemDetailDto[];
  doctorList!: UserVo[];

  bookingList!: OrgBookingDto[];

  productList!: ProductVo[];

  displayedColumns: string[] = ['appNo', 'name', 'date', "time", "doctor", "consultationFor","action"];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // serviceItemList!: ItemDetailDto[];
  // doctorList!: UserVo[];

  showAllFilters: boolean = false;

  filters: ColumnWiseFiltersDto = {
    appNo: '',
    name: '',
    date: '',
    time: '',
    doctor: '',
    consultationFor: '',
    action: '',
  };


  filteredData: PeriodicElement[] = [...ELEMENT_DATA];
  /* ************************************ Constructors ************************************ */
  constructor(private keyValueStorageService: KeyValueStorageService,
    private serviceItemApi: ServiceItemApi,
    private userApi: UserApi,
    private bookingApi: BookingApi,
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

  // public applyNewFilter(event: Event, columnName: string): void {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.filters[columnName] = filterValue.trim().toLowerCase();
  //   this.dataSource.filter = JSON.stringify(this.filters);
  
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  public applyOldFilter(event: Event, columnName: string): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    
    // Create a custom filter function based on the selected column
    const filterFunction = (data: PeriodicElement): boolean => {
      // Use the selected column to access the corresponding property in data
      const columnValue = data[columnName].toLowerCase();
      return columnValue.includes(filterValue);
    };
  
    // Set the custom filter function to the data source filter predicate
    this.dataSource.filterPredicate = filterFunction;
  
    // Apply the filter
    this.dataSource.filter = filterValue;
  }

  public applyNewFilter(event: Event, columnName: string): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    // Filter data based on the current column
    const filteredColumnData = this.filteredData.filter((data) =>
      data[columnName].toLowerCase().includes(filterValue)
    );
  
    // Update the filteredData array with the filteredColumnData
    this.filteredData = filteredColumnData;
  
    // Update the table data source
    this.dataSource.data = this.filteredData;
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public addAppointment() {
    const userBooking = {} as UserBookingDto;
    const booking = {} as BookingVo;
    booking.type = BOOKING_TYPE.APPOINTMENT; // TODO change if appointment
    booking.observation = {} as ObservationVo;
    booking.observation.date = new Date();
    booking.observation.healthParams = [] as Array<KeyValueVo>;
    booking.prescription = [] as PrescriptionVo[];
    booking.instruction = [] as string[];
    booking.test = [] as string[];
    booking.bookingDate = new Date();
    booking.complaint = [] as string[];
    booking.complaint.push("");
    booking.diagnosis = [] as string[];
    booking.drExt = [] as string[];
    booking.drExt.push("");
    const orgId = this.keyValueStorageService.getOrgId();
    if (orgId) {
      booking.orgId = orgId;
      booking.brId = orgId;
    }
    userBooking.booking = booking;
    userBooking.user = {} as UserVo;
    userBooking.user.address = {} as AddressVo;
    // this._addEditOrg(userBooking);
    this._addEditAppointment(userBooking);
  }

  public searchTodaysAppointments(): void {
    const filterValue = new Date().toLocaleDateString();
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public searchPreviousAppointments():void {
    

  }

  public saveBooking(): void {
    this.bookingApi.addUpdateBooking(this.userBooking).subscribe((res: ApiResponse<UserBookingDto>) => {
      if (res.status === ResponseStatus[ResponseStatus.SUCCESS] && res.body) {
        this.userBooking = res.body
        // console.log("showxxx",this.userBooking);
      }
    });
  }

  public cancel(): void {
    this._init();
  }

public getAllFilters():void {
this.showAllFilters = !this.showAllFilters;
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
  private _addEditAppointment(userBooking: UserBookingDto): void {
    this.userBooking = userBooking;
    // console.log("xxxxshow",this.userBooking);
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