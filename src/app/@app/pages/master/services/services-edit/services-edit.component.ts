import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddServiceVo } from 'src/app/@shared/dto/add-service.dto';

@Component({
    selector: 'app-services-edit',
    templateUrl: './services-edit.component.html',
})

export class ServicesEditComponent implements OnInit {
    /* ************************************* Instance Field ******************************************** */
    @Input()
    addService!: AddServiceVo;

   
    /* ************************************* Public Methods ******************************************** */
    ngOnInit(): void {
        const serviceItem = {} as AddServiceVo
        serviceItem.serviceCode = '';
        serviceItem.serviceName = '';
        serviceItem.serviceType = '';
        serviceItem.department = '';
        serviceItem.associatedDoctor = '';
        serviceItem.feeType = '';
        serviceItem.fee = 0;
        serviceItem.feeDistribution = '';
        this.addService = serviceItem;
    }
    onSave(): void {
        console.log(this.addService)
    }
    
}
