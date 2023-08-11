import { Component, Input,} from '@angular/core';
import { YES_NO_LIST } from 'src/app/@app/const/yes-no.const';
import { AddServiceTypeVo } from 'src/app/@shared/dto/add-service-type.dto';

@Component({
    selector: 'app-service-type-edit',
    templateUrl: './service-type-edit.component.html',
})
export class ServiceTpeEditComponent {
   /* ********************************* Static Field *************************************** */
  /* *********************************** Instance Field *********************************** */ 
    @Input()
    addServiceType!: AddServiceTypeVo;
    
    yesNoList = YES_NO_LIST;
    /* ************************************* Constructors ******************************************** */
    constructor() { }
    
    /* ************************************* Public Methods ******************************************** */
    

    /* ************************************* Private Methods ******************************************** */

    
}