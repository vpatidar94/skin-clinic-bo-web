import { Component, Input, } from '@angular/core';
import { ProductVo } from 'aayam-clinic-core';

@Component({
    selector: 'app-product-edit',
    templateUrl: './product-edit.component.html',
})
export class ProductEditComponent {
    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */
    @Input()
    product!: ProductVo;
    isQtyPerStripActive: boolean = false;

    /* ************************************* Constructors ******************************************** */
    constructor() { }

    /* ************************************* Public Methods ******************************************** */
    public onProductTypeChange() {
        this.isQtyPerStripActive = this.product.productType === 'Tablet' || this.product.productType === 'Capsule';
    }

    /* ************************************* Private Methods ******************************************** */

}