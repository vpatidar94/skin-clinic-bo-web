import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { BookingApi } from '../../service/remote/booking.api';
import { ApiResponse, OrgBookingDto } from 'aayam-clinic-core';

export interface PeriodicElement {
    visitId: number;
    patientName: string;
    patientType: string;
    patientId: string;
    sampleDate: string;
    doctorsName: string;
    action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { visitId: 1101, patientName: 'Chhitu Yadav', patientType: '7898454503', patientId: 'P10210', sampleDate: '02/09/2023', doctorsName: 'Dr.Mayank Patidar', action: "View" },
    { visitId: 1202, patientName: 'Virat kohli', patientType: '86566546544', patientId: 'P10210', sampleDate: '02/09/2023', doctorsName: 'Dr.Mayank Patidar', action: "View" },
    { visitId: 3625, patientName: 'Rohit Sharma', patientType: '654498498554', patientId: 'P10210', sampleDate: '02/09/2023', doctorsName: 'Dr.Mayank Patidar', action: "View" },
    { visitId: 1464, patientName: 'Hardik Pandya', patientType: '656484654555', patientId: 'P10210', sampleDate: '02/09/2023', doctorsName: 'Dr.Mayank Patidar', action: "View" },
    { visitId: 8555, patientName: 'AB de Villiers', patientType: '371648984588', patientId: 'P10210', sampleDate: '02/09/2023', doctorsName: 'Dr.Mayank Patidar', action: "View" },
]

@Component({
    selector: 'app-investigation',
    templateUrl: './investigation.component.html',
    styleUrls: ['./investigation.component.scss']
})

export class InvestigationComponent {

    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */
    investigationList!: OrgBookingDto[];


    displayedColumns: string[] = ['visitId', 'patientName', 'patientType', 'patientId', 'sampleDate', 'doctorsName', "action"];
    // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    dataSource = new MatTableDataSource<OrgBookingDto>([] as OrgBookingDto[]);



    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    /* ************************************* Constructors ******************************************** */
    constructor(
        private keyValueStorageService: KeyValueStorageService,
        private bookingApi: BookingApi,

    ) {
        this._getInvestigationList();

     }

    /* ************************************* Public Methods ******************************************** */

    public ngAfterViewInit() {
        this.paginator.showFirstLastButtons = false;
        this.paginator.hidePageSize = false;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    public applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    public _getInvestigationList(){
        const orgId = this.keyValueStorageService.getOrgId();
        if (!orgId) {
          return;
        }
        this.bookingApi.getInvestigationList(orgId).subscribe((res: ApiResponse<OrgBookingDto[]>) => {
          this.investigationList = res.body ?? [] as OrgBookingDto[];
          console.log("kkkkklmnop",this.investigationList);
          this.dataSource = new MatTableDataSource(this.investigationList);

        })
      }
}
