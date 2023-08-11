import { Component, Input,} from '@angular/core';
import { ProductVo } from 'src/app/@shared/dto/product.dto';


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
        this.isQtyPerStripActive = this.product.productType === 'opd' || this.product.productType === 'percentage';
    }

    /* ************************************* Private Methods ******************************************** */

    
}