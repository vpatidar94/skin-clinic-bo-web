import { Component, OnInit, Input } from '@angular/core';
import { DepartmentVo, ItemVo, ServiceTypeVo, UserVo } from 'aayam-clinic-core';
import { FEE_TYPE_LIST } from 'src/app/@app/const/fee-type.const';

@Component({
    selector: 'app-services-edit',
    templateUrl: './services-edit.component.html',
})

export class ServicesEditComponent {
    /* ********************************* Static Field *************************************** */
    /* ************************************* Instance Field ******************************************** */
    @Input()
    serviceTypeList!: ServiceTypeVo[];

    @Input()
    departmentList!: DepartmentVo[];

    @Input()
    serviceItem!: ItemVo;

    @Input()
    doctorList!: UserVo[];

    feeTypeList = FEE_TYPE_LIST;
    /* ************************************* Constructors ******************************************** */
    constructor() { }

    /* ************************************* Public Methods ******************************************** */
    /* ************************************* Private Methods ******************************************** */


}
