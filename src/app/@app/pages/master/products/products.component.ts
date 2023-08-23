import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { ApiResponse, ProductVo, ResponseStatus } from 'aayam-clinic-core';
import { ProductApi } from 'src/app/@app/service/remote/product.api';

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

    displayedColumns: string[] = ['Product Code', 'Product Name', 'Product Type', "Price", "Action"];
    dataSource = new MatTableDataSource<ProductVo>([] as ProductVo[]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

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

    public AddProduct() {
        const productDetails = {} as ProductVo;
        const orgId = this.keyValueStorageService.getOrgId();
        if (orgId) {
            productDetails.orgId = orgId;
            productDetails.brId = orgId;
        }
        this.product = productDetails;
        this._addEditProduct();
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
        })
    }

    public savingProduct(): void {
        this.productApi.addUpdateProduct(this.product).subscribe((res: ApiResponse<ProductVo>) => {
            if (res.status === ResponseStatus[ResponseStatus.SUCCESS] && res.body) {
                this.product = res.body
                this._init();
            }
        });
    }

    public cancel(): void {
        this._init();
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

    private _addEditProduct(): void {
        this._resetSection();
        this.showSectionProductEdit = true;
    }
}
