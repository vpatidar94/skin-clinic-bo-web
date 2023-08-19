import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepartmentVo, ItemVo, ServiceTypeVo, UserVo } from 'aayam-clinic-core';
import { YES_NO_LIST } from 'src/app/@app/const/yes-no.const';
import { AddServiceVo } from 'src/app/@shared/dto/add-service.dto';

@Component({
    selector: 'app-services-edit',
    templateUrl: './services-edit.component.html',
})

export class ServicesEditComponent {
    /* ********************************* Static Field *************************************** */
    /* ************************************* Instance Field ******************************************** */
    @Input()
    addService!: AddServiceVo;

    @Input()
    serviceTypeList!: ServiceTypeVo[];

    @Input()
    departmentList!: DepartmentVo[];

    @Input()
    serviceItem!: ItemVo;

    @Input()
    doctorList!: UserVo[];

    yesNoList = YES_NO_LIST;

    /* ************************************* Constructors ******************************************** */
    constructor() { }

    /* ************************************* Public Methods ******************************************** */
    /* ************************************* Private Methods ******************************************** */


}
