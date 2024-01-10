import { Component, Input, OnInit } from '@angular/core';
import { ApiResponse, PRODUCT_PACK_TYPE_LIST, PRODUCT_TYPE_LIST, ProductVo, ResponseStatus } from 'aayam-clinic-core';
import { ProductApi } from 'src/app/@app/service/remote/product.api';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';

@Component({
    selector: 'app-add-product-dialog',
    templateUrl: './add-product-dialog.component.html',
})
export class AddProductDialogComponent implements OnInit {
    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */

    product!: ProductVo;
    productTypeList = PRODUCT_TYPE_LIST;
    productPackTypeList = PRODUCT_PACK_TYPE_LIST;
    // isQtyPerStripActive: boolean = false;

    /* ************************************* Constructors ******************************************** */
    constructor(private keyValueStorageService: KeyValueStorageService,
        private productApi: ProductApi) { }

    /* ************************************* Public Methods ******************************************** */
    // public onProductTypeChange() {
    //     this.isQtyPerStripActive = this.product.productType === 'Tablet' || this.product.productType === 'Capsule';
    // }

    public ngOnInit(): void {
        const productDetails = {} as ProductVo;
        const orgId = this.keyValueStorageService.getOrgId();
        if (orgId) {
            productDetails.orgId = orgId;
            productDetails.brId = orgId;
        }
        this._addEditProduct(productDetails);
    }

    private _addEditProduct(productDetails: ProductVo): void {
        this.product = productDetails;

    }

    public savingProduct(): void {
        this.productApi.addUpdateProduct(this.product).subscribe((res: ApiResponse<ProductVo>) => {
            if (res.status === ResponseStatus[ResponseStatus.SUCCESS] && res.body) {
                this.product = res.body
                // this._init();
            }
        });
    }

    /* ************************************* Private Methods ******************************************** */


}