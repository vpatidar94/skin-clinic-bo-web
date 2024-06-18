import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { ApiResponse, ProductVo, ResponseStatus } from 'aayam-clinic-core';
import { ProductApi } from 'src/app/@app/service/remote/product.api';
import { ResponseStatusConst } from 'src/app/@shared/const/response-status-const';

@Component({
    selector: 'app-products',
    styleUrls: ['./products.component.scss'],
    templateUrl: './products.component.html',
})

export class ProductsComponent implements AfterViewInit, OnInit {

    /* ************************************* Static Field ********************************************* */
    /* ************************************* Instance Field ******************************************** */
    product!: ProductVo;
    productList!: ProductVo[];
    resultsLength = 0;

    showSectionProductList!: boolean;
    showSectionProductEdit!: boolean;

    displayedColumns: string[] = ['productCode', 'productName', 'productType', "price", "action"];
    dataSource = new MatTableDataSource<ProductVo>([] as ProductVo[]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    columnFilters: { [key: string]: string } = {};

    originalDataSource: ProductVo[] = [];
    filteredData: ProductVo[] = [];

    /* ************************************* Constructors ******************************************** */
    constructor(private keyValueStorageService: KeyValueStorageService,
        private productApi: ProductApi) {
    }

    /* ************************************* Public Methods ******************************************** */
    public ngAfterViewInit() {
        this.paginator.showFirstLastButtons = false;
        this.paginator.hidePageSize = false;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
        let dataToFilter: ProductVo[];
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

    public ngOnInit(): void {
        this._init();
    }

    public AddProduct() {
        const productDetails = {} as ProductVo;
        const orgId = this.keyValueStorageService.getOrgId();
        if (orgId) {
            productDetails.orgId = orgId;
            productDetails.brId = orgId;
        }
        this._addEditProduct(productDetails);
    }

    public _getProductList(): void {
        const orgId = this.keyValueStorageService.getOrgId();
        if (!orgId) {
            return;
        }
        this.productApi.getProductList(orgId).subscribe((res: ApiResponse<ProductVo[]>) => {
            this.productList = res.body ?? [] as ProductVo[];
            this.resultsLength = this.productList.length;
            this.dataSource = new MatTableDataSource(this.productList);
            this.originalDataSource = [...this.productList]; // Copy the data
        })
    }

    public savingProduct(): void {
        this.productApi.addUpdateProduct(this.product).subscribe((res: ApiResponse<ProductVo>) => {
            if (res.status === ResponseStatusConst.SUCCESS && res.body) {
                this.product = res.body
                this._init();
            }
        });
    }

    public cancel(): void {
        this._init();
    }

    public editProduct(product: ProductVo): void {
        this._addEditProduct(product);
    }

    /* ************************************* Private Methods ******************************************** */
    private _init(): void {
        this._resetSection();
        this.showSectionProductList = true;
        this._getProductList();
    }

    private _resetSection(): void {
        this.showSectionProductList = false;
        this.showSectionProductEdit = false;
    }

    private _addEditProduct(productDetails: ProductVo): void {
        this.product = productDetails;
        this._resetSection();
        this.showSectionProductEdit = true;
    }

    private getCellValue(data: ProductVo, columnName: string): string | undefined {
        if (columnName === 'productCode' && data.code) {
            return data.code.toLowerCase();
        }
        else if (columnName === 'productName' && data.name) {
            return data.name.toLowerCase();
        }
        else if (columnName === 'productType' && data.productType) {
            return data.productType.toLowerCase();
        }
        else if (columnName === 'price' && data.price) {
            return data.price.toString();
        }
        return undefined;
    }
}
