import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductVo } from 'src/app/@shared/dto/product.dto';


export interface PeriodicElement {
    ProductCode: number;
    ProductName: string;
    ProductType: string;
    Price: string;
    Action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { ProductCode: 1, ProductName: 'OPD', ProductType: 'OPD', Price: '1120', Action: "Edit | Delete" },
    { ProductCode: 2, ProductName: 'Dressing', ProductType: 'Dressing', Price: '1120', Action: "Edit | Delete" },
    { ProductCode: 3, ProductName: 'Blood Test', ProductType: '', Price: '11:20', Action: "Edit | Delete" },
    { ProductCode: 4, ProductName: '', ProductType: '', Price: '1110', Action: "Edit | Delete" },
    { ProductCode: 5, ProductName: '', ProductType: 'z', Price: '1100', Action: "Edit | Delete" },
    { ProductCode: 6, ProductName: '', ProductType: '', Price: '120', Action: "Edit | Delete" },
    { ProductCode: 7, ProductName: '', ProductType: 'kat', Price: '100', Action: "Edit | Delete" },
]
@Component({
    selector: 'app-products',
    styleUrls: ['./products.component.scss'],
    templateUrl: './products.component.html',
})

export class ProductsComponent implements AfterViewInit, OnInit {

    /* ************************************* Static Field ********************************************* */
    /* ************************************* Instance Field ******************************************** */
    product!: ProductVo;

    showSectionProductList!: boolean;
    showSectionProductEdit!: boolean;

    displayedColumns: string[] = ['Product Code', 'Product Name', 'Product Type', "Price", "Action"];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    /* ************************************* Constructors ******************************************** */
    constructor() { }

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
        productDetails.productCode = 123;
        productDetails.purchaseDate = new Date();
        productDetails.productName = "";
        productDetails.drug = "";
        productDetails.company = "";
        productDetails.productType = "";
        productDetails.qtyPerStrip = 0;
        productDetails.pricePerStrip = 0;
        productDetails.price = 0;
        productDetails.expiryDate = new Date();
        this.product = productDetails;
        this._addEditProduct();
    }

    public _getProductList(): void {
    }

    public savingProduct(): void {
        this._init();
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
