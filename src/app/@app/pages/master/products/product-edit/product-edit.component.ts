import { Component, Input, } from '@angular/core';
import { PRODUCT_TYPE_LIST, ProductVo, PRODUCT_PACK_TYPE_LIST } from 'aayam-clinic-core';

@Component({
    selector: 'app-product-edit',
    templateUrl: './product-edit.component.html',
})
export class ProductEditComponent {
    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */
    @Input()
    product!: ProductVo;
    // isQtyPerStripActive: boolean = false;

    productTypeList = PRODUCT_TYPE_LIST;
    productPackTypeList = PRODUCT_PACK_TYPE_LIST;


    /* ************************************* Constructors ******************************************** */
    constructor() { }

    /* ************************************* Public Methods ******************************************** */
    // public onProductTypeChange() {
    //     this.isQtyPerStripActive = this.product.productType === 'Tablet' || this.product.productType === 'Capsule';
    // }

    /* ************************************* Private Methods ******************************************** */

}