import { Component, Input, } from '@angular/core';
import { DepartmentVo, UserTypeVo, UserEmpDto } from 'aayam-clinic-core';

@Component({
    selector: 'app-user-type-edit',
    templateUrl: './user-type-edit.component.html',
})
export class UserTypeEditComponent {
    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */
    @Input()
    userType!: UserTypeVo;

    @Input()
    departmentList!: DepartmentVo[];

    /* ************************************* Constructors ******************************************** */
    constructor() { }

    /* ************************************* Public Methods ******************************************** */


    /* ************************************* Private Methods ******************************************** */


}