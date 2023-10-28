import { Component, Input, OnInit, } from '@angular/core';
import { ProductVo } from 'aayam-clinic-core';

export interface NewItemInterface {
    sNo: string,
    itemName: string,
    company: string,
    qty: string,
    packaging: string,
    expiry: string,
}

@Component({
    selector: 'app-hospital-inventory-item-edit',
    templateUrl: './hospital-inventory-item-edit.component.html',
})
export class HospitalInventoryItemEditComponent implements OnInit{

    newItemData = [{
        sNo: '',
        itemName: '',
        company: '',
        qty: '',
        packaging: '',
        expiry: '',
    }];

    newItem!: Array<NewItemInterface>

    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */

    /* ************************************* Constructors ******************************************** */
    constructor() { }

    /* ************************************* Public Methods ******************************************** */

    public ngOnInit(): void {
        this.newItem= (this.newItemData as Array<NewItemInterface>);
       }

    public removeTestParameter(index: number): void {
        this.newItem.splice(index, 1);
    }

    public addTestParameter() {
        this.newItem.push({
            sNo: '',
            itemName: '',
            company: '',
            qty: '',
            packaging: '',
            expiry: '',
        });
    }

    /* ************************************* Private Methods ******************************************** */

}