import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiResponse, PRODUCT_PACK_TYPE_LIST, PRODUCT_TYPE_LIST, ProductVo, ResponseStatus } from 'aayam-clinic-core';
import { ProductApi } from 'src/app/@app/service/remote/product.api';
import { ResponseStatusConst } from 'src/app/@shared/const/response-status-const';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';

@Component({
    selector: 'app-add-other-product-dialog',
    templateUrl: './add-other-product-dialog.component.html',
})
export class AddOtherProductDialogComponent implements OnInit {
    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */

    product!: ProductVo;
    productTypeList = PRODUCT_TYPE_LIST;
    productPackTypeList = PRODUCT_PACK_TYPE_LIST;
    // isQtyPerStripActive: boolean = false;

    /* ************************************* Constructors ******************************************** */
    constructor(public dialogRef: MatDialogRef<AddOtherProductDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ProductVo,
        private keyValueStorageService: KeyValueStorageService,
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
        productDetails.price = 0;
        this._addEditProduct(productDetails);
    }

    private _addEditProduct(productDetails: ProductVo): void {
        this.product = productDetails;

    }

    public saveProduct(): void {
        this.productApi.addUpdateProduct(this.product).subscribe((res: ApiResponse<ProductVo>) => {
            if (res.status === ResponseStatusConst.SUCCESS && res.body) {
                this.dialogRef.close(res.body); 
            }
        });
    }

    /* ************************************* Private Methods ******************************************** */


}