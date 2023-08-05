import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AddServiceVo } from 'src/app/@shared/dto/add-service.dto';
import { AddressVo, ApiResponse, BookingVo, ItemDetailDto, KeyValueVo, ObservationVo, PrescriptionVo, ResponseStatus, UserBookingDto, UserVo } from 'aayam-clinic-core';
import { AuthService } from 'src/app/@shared/security/auth.service';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';

//newly added to show table
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

// newly added to show table
export interface PeriodicElement {
    ServiceCode: number;
    ServiceName: string;
    ServiceType: string;
    DoctorsName: string;
    Fee: string;
    Action: string;
}

// newly added to show table
const ELEMENT_DATA: PeriodicElement[] = [
    { ServiceCode: 1, ServiceName: 'OPD', ServiceType: 'OPD', DoctorsName: 'Dr.Mayank Patidar', Fee: '1120', Action: "Edit | Delete" },
    { ServiceCode: 2, ServiceName: 'Dressing', ServiceType: 'Dressing', DoctorsName: 'Dr.aayam', Fee: '1120', Action: "Edit | Delete" },
    { ServiceCode: 3, ServiceName: 'Blood Test', ServiceType: '', DoctorsName: 'Dr.Atharv', Fee: '11:20', Action: "Edit | Delete" },
    { ServiceCode: 4, ServiceName: '', ServiceType: '', DoctorsName: 'Dr.Aman', Fee: '1120', Action: "Edit | Delete" },
    { ServiceCode: 5, ServiceName: '', ServiceType: 'z', DoctorsName: 'Dr.aayam', Fee: '1120', Action: "Edit | Delete" },
    { ServiceCode: 6, ServiceName: '', ServiceType: '', DoctorsName: 'Dr.Atharv', Fee: '1120', Action: "Edit | Delete" },
    { ServiceCode: 7, ServiceName: '', ServiceType: 'kat', DoctorsName: 'Dr.Aman', Fee: '1120', Action: "Edit | Delete" },
]
@Component({
    selector: 'app-services',
    styleUrls: ['./services.component.scss'],
    templateUrl: './services.component.html',
})

export class ServicesComponent implements AfterViewInit, OnInit {

    /* ************************************* Static Field ********************************************* */
    /* ************************************* Instance Field ******************************************** */
    addService!: AddServiceVo;
    
    ngOnInit(): void {
        const serviceItem ={} as AddServiceVo
        serviceItem.serviceCode = '';
        serviceItem.serviceName ='';
        serviceItem.serviceType = '';
        serviceItem.department = '';
        serviceItem.associatedDoctor = '';
        serviceItem.feeType = '';
        serviceItem.fee = 0;
        serviceItem.feeDistribution = '';
        this.addService = serviceItem;
    }
    showAddServiceSection: boolean = false;
    toggleAddServiceSection(): void {
        console.log('Toggle function called');
        this.showAddServiceSection = !this.showAddServiceSection;
      }
      onSave() : void{
        console.log(this.addService)
      }

    // newly added to show table
    displayedColumns: string[] = ['Service Code', 'Service Name', 'Service Type', 'DoctorsName', "Fee", "Action"];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    /* ************************************* Constructors ******************************************** */
    constructor() {
        
     }

    /* ************************************* Public Methods ******************************************** */
    // newly added to show table
    public ngAfterViewInit() {
        this.paginator.showFirstLastButtons = false;
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
