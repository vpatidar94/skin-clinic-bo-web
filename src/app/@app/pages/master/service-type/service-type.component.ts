import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AddressVo, ApiResponse, BookingVo, ItemDetailDto, KeyValueVo, ObservationVo, PrescriptionVo, ResponseStatus, UserBookingDto, UserVo } from 'aayam-clinic-core';
import { AuthService } from 'src/app/@shared/security/auth.service';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';

//newly added to show table
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

// newly added to show table
export interface PeriodicElement {
  SerialNo: number;
  ServiceType: string;
  DoctorsName: string;
  Department: string;
  Action: string;
}

// newly added to show table
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
    
    export class ServiceTypeComponent implements  AfterViewInit {

  /* ************************************* Static Field ********************************************* */
  /* ************************************* Instance Field ******************************************** */
  showAddServiceTypeSection: boolean = false;
  toggleAddServiceTypeSection() {
      console.log('Toggle function called');
      this.showAddServiceTypeSection = !this.showAddServiceTypeSection;
    }


  // newly added to show table
  displayedColumns: string[] = ['Serial No', 'Service Type', 'DoctorsName', "Department", "Action"];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  /* ************************************* Constructors ******************************************** */
  constructor() { }

  /* ************************************* Public Methods ******************************************** */

  // newly added to show table
  public ngAfterViewInit() {
    this.paginator.showFirstLastButtons  = false;
    this.paginator.hidePageSize = false;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
// newly added to show table
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /* ************************************* Private Methods ******************************************** */

 
}


