import { Component, Input, } from '@angular/core';
import { DepartmentVo, ServiceTypeVo } from 'aayam-clinic-core';
import { YES_NO_LIST } from 'src/app/@app/const/yes-no.const';

@Component({
    selector: 'app-service-type-edit',
    templateUrl: './service-type-edit.component.html',
})
export class ServiceTypeEditComponent {
    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */

    @Input()
    serviceType!: ServiceTypeVo;

    @Input()
    departmentList!: DepartmentVo[];

    yesNoList = YES_NO_LIST;
    /* ************************************* Constructors ******************************************** */
    constructor() {}

    /* ************************************* Public Methods ******************************************** */


    /* ************************************* Private Methods ******************************************** */


}