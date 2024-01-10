
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse, OrgPharmacyOrderCountDto, OrgPharmacyOrderDto, ProductVo } from 'aayam-clinic-core';
import { catchError, map, of as observableOf, startWith, switchMap } from 'rxjs';
import { PharmacyApi } from 'src/app/@app/service/remote/pharmacy.api';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { ViewPatientComponent } from '../view-patient/view-patient.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductApi } from 'src/app/@app/service/remote/product.api';

@Component({
    selector: 'app-pharmacy-billing',
    templateUrl: './pharmacy-billing.component.html',
    styleUrls: ['./pharmacy-billing.component.scss']
})

export class PharmacyBillingComponent implements OnInit {

    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */
    displayedColumns: string[] = ['appNo', 'date', 'patientName', 'doctorsName', 'amount', "action"];
    dataSource = new MatTableDataSource<OrgPharmacyOrderDto>([] as OrgPharmacyOrderDto[]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;


    showSectionPharmacyBillingList: boolean = false;
    showSectionPharmacyEdit: boolean = false;

    resultsLength = 0;
    orderList!: OrgPharmacyOrderDto[];

    columnFilters: { [key: string]: string } = {};

    originalDataSource: OrgPharmacyOrderDto[] = [];
    filteredData: OrgPharmacyOrderDto[] = [];

    productList!: ProductVo[];

    /* ************************************* Constructors ******************************************** */
    constructor(private keyValueStorageService: KeyValueStorageService,
        private pharmacyApi: PharmacyApi,
        private dialog: MatDialog,
        private productApi: ProductApi
    ) {
    }

    /* ************************************* Public Methods ******************************************** */
    public ngOnInit(): void {
        this._init();
    }

    public ngAfterViewInit() {
        const orgId = this.keyValueStorageService.getOrgId();
        if (!orgId) {
            return;
        }
        this.dataSource.paginator = this.paginator;

        this.paginator.page
            .pipe(
                startWith({}),
                switchMap(() => {
                    return this.pharmacyApi.getOrderList(
                        orgId,
                        this.paginator.pageIndex + 1,
                        this.paginator.pageSize
                    ).pipe(catchError(() => observableOf()));
                }),
                map((res: ApiResponse<OrgPharmacyOrderCountDto>) => {
                    if (res.body) {
                        this.resultsLength = res.body?.totalOrder;
                        return res.body;
                    }
                    return {} as OrgPharmacyOrderCountDto;
                })
            )
            .subscribe((dto) => {
                this.orderList = dto?.orgOrder ?? [] as OrgPharmacyOrderDto[];
                this.dataSource = new MatTableDataSource(this.orderList);
                this.originalDataSource = [...this.orderList];
            });
    }

    public applyFilter(columnName: string, event: Event) {
        const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
        this.columnFilters[columnName] = filterValue;
        // Combine all column filters
        const combinedFilters = Object.values(this.columnFilters).filter((filter) => !!filter);
        // If there are no filters, show all data
        if (combinedFilters.length === 0) {
            this.dataSource.data = this.originalDataSource;
            this.filteredData = []; // Reset filtered data array
            return;
        }
        // Filter the data progressively from the original data or the previously filtered data
        let dataToFilter: OrgPharmacyOrderDto[];
        if (this.filteredData.length > 0) {
            dataToFilter = [...this.filteredData];
        } else {
            dataToFilter = [...this.originalDataSource];
        }
        for (const filter of combinedFilters) {
            dataToFilter = dataToFilter.filter((data) => {
                const cellValue = this.getCellValue(data, columnName);

                if (cellValue !== undefined && cellValue.includes(filter)) {
                    return true; // Include the row if the cell value matches the filter
                }

                return false; // Exclude the row if no match is found or cellValue is undefined
            });
        }
        // Update the data source with the filtered data
        this.dataSource.data = dataToFilter;
        this.filteredData = dataToFilter;
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    public addNewCustomer(): void {
        this._resetSection();
        this.showSectionPharmacyEdit = true;
    }

    public cancel(): void {
        this._init();
    }

    public openPrescriptionBilling(pharmacyOrder: OrgPharmacyOrderDto): void {
        this.dialog.open(ViewPatientComponent, {
            width: '1600px',
            height: '550px',
            data: { pharmacyOrder, productList: this.productList }
        });
    }

    /* ************************************ Private Methods ************************************ */
    private _init(): void {
        this._getProductList();
        this._resetSection();
        this.showSectionPharmacyBillingList = true;
    }

    private _getProductList(): void {
        const orgId = this.keyValueStorageService.getOrgId();
        if (!orgId) {
            return;
        }
        this.productApi.getProductList(orgId).subscribe((res: ApiResponse<ProductVo[]>) => {
            this.productList = res.body ?? [] as ProductVo[];
        })
    }

    private _resetSection(): void {
        this.showSectionPharmacyBillingList = false;
        this.showSectionPharmacyEdit = false;
    }

    private getCellValue(data: OrgPharmacyOrderDto, columnName: string): string | undefined {
        if (columnName === 'appNo' && data.order.no) {
            return data.order.no.toLocaleLowerCase();
        }
        else if (columnName === 'date' && data.order.bookingDate) {
            return data.order.bookingDate.toString();
        }
        else if (columnName === 'patientName' && data.patient.nameF) {
            return data.patient.nameF.toLowerCase();
        }
        else if (columnName === 'doctorsName' && data.drDetail?.nameF) {
            return data.drDetail?.nameF.toLowerCase();
        }
        return undefined;
    }
}
