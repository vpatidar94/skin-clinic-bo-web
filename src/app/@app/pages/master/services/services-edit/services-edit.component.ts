import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

    /* ************************************* Constructors ******************************************** */
    constructor() { }

    /* ************************************* Public Methods ******************************************** */
    /* ************************************* Private Methods ******************************************** */


}
