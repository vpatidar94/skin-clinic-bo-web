import { Component, Input, } from '@angular/core';
import { DEPT_LIST, DepartmentVo } from 'aayam-clinic-core';

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
})
export class DepartmentEditComponent {
  /* ********************************* Static Field *************************************** */
  /* *********************************** Instance Field *********************************** */
  @Input()
  department!: DepartmentVo;

  departmentTypeList = DEPT_LIST;

  /* ************************************* Constructors ******************************************** */
  constructor() { }

}