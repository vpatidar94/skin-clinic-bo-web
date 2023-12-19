import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { BookingApi } from '../../service/remote/booking.api';
import { ApiResponse, OrgBookingDto } from 'aayam-clinic-core';

@Component({
    selector: 'app-investigation',
    templateUrl: './investigation.component.html',
    styleUrls: ['./investigation.component.scss']
})

export class InvestigationComponent implements OnInit {

    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */
    investigationList!: OrgBookingDto[];

    displayedColumns: string[] = ['visitId', 'patientName', 'patientType', 'patientId', 'sampleDate', 'doctorsName', "action"];
    dataSource = new MatTableDataSource<OrgBookingDto>([] as OrgBookingDto[]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    public showSectionBookingList!: boolean;
    public showSectionBookingDetail!: boolean;

    booking!: OrgBookingDto;

    /* ************************************* Constructors ******************************************** */
    constructor(
        private keyValueStorageService: KeyValueStorageService,
        private bookingApi: BookingApi) { }

    /* ************************************* Public Methods ******************************************** */
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

    public viewInvestigation(row: OrgBookingDto): void {
        this.booking = row;
        this._resetSection();
        this.showSectionBookingDetail = true;
    }

    /* ************************************* Private Methods ******************************************** */
    private _init(): void {
        this._getInvestigationList();
    }

    private _getInvestigationList(): void {
        this._resetSection();
        const orgId = this.keyValueStorageService.getOrgId();
        if (!orgId) {
            return;
        }
        this.bookingApi.getInvestigationList(orgId).subscribe((res: ApiResponse<OrgBookingDto[]>) => {
            this.investigationList = res.body ?? [] as OrgBookingDto[];
            this.dataSource = new MatTableDataSource(this.investigationList);
            this.showSectionBookingList = true;
        });
    }

    private _resetSection(): void {
        this.showSectionBookingList = false;
        this.showSectionBookingDetail = false;
    }
}
