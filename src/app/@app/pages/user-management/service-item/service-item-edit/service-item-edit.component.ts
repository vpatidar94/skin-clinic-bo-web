import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddressVo, MessageService, MessageType, OrgVo, ItemVo, UserVo } from 'aayam-clinic-core';
import { UiActionDto } from 'src/app/@shared/dto/ui-action.dto';
import { GlobalEmitterService } from 'src/app/@shared/service/global-emitter.service';
import { ORG_TYPE_LIST } from '../../../../const/org-type.const'

@Component({
    selector: 'app-service-item-edit',
    templateUrl: './service-item-edit.component.html'
})
export class ServiceItemEditComponent implements OnInit {
    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */
    inValidAddressForm!: boolean;
    invalidPh!: boolean;

    @Input()
    serviceItemBr!: ItemVo;
    @Output()
    serviceItemBrChange = new EventEmitter<ItemVo>();

    @Output()
    pubSub = new EventEmitter<any>();

    @ViewChild('serviceItemForm', { static: true })
    serviceItemForm!: NgForm;

    orgTypeList = ORG_TYPE_LIST;

    // orgTypes: Array<string> = TYPE_VAL.orgTypes;
    // titleItems: any = TYPE_VAL.titleItems;
    // orgServices: Array<string> = TYPE_VAL.orgServices;

    // selectedServices: Array<string> = [];
    // initialCountry = APP_CONSTANT.TEL_COUNTRY;

    isDbaAndOrgAddressSame!: boolean;

    /* ************************************ Constructors ************************************ */
    constructor(private globalEmitterService: GlobalEmitterService) {
    }

    /* ************************************ Public Methods ************************************ */
    public ngOnInit(): void {
        this._init();
        // @ts-ignore
        this.serviceItemForm.valueChanges.subscribe(() => {
            this._formChanged();
        });
    }

    public addressFormChange(event: UiActionDto<boolean>): void {
        switch (event.action) {
            case 'CHANGE_FORM_ADDRESS':
                this.inValidAddressForm = event.data;
                this._formChanged();
                break;
        }
    }

    /* ************************************ Cell Methods Start ************************************ */
    public hasError(valid: any): void {
        if (!valid) {
            const errorMsg = 'Enter valid cell.';
            this.globalEmitterService.addMsg(new MessageService().mergeMessage([], MessageType[MessageType.ERROR], errorMsg));
            return;
        }
    }

    // public getNumber(cell: string): void {
    //     this.serviceItemBr.name = cell;
    //     this.serviceItemBrChange.emit(this.serviceItemBr);
    // }

    public telInputObject(): void {
        // if (this.org.ph) {
        //   iti.intlTelInput('setNumber', this.org.ph);
        // }
        // [ng2TelInputOptions]='{initialCountry: 'us'}'
        // this.iti.intlTelInput('setCountry', 'us');
        // this.iti.intlTelInput('setNumber', '+919922193380');
    }

    public onCountryChange(e: any): void {
        console.log('onCountryChange ', e);
    }

    public getSelectedServiceToServer(): void {
        // this.orgBr.org.service = this._getSelectedServiceToServer(this.selectedServices);
    }

    // public setDbaAddress(): void {
    //     this.serviceItemBr.address = "";
    // }

    /* ************************************ Cell Methods End ************************************ */

    /* ************************************ Private Methods ************************************ */
    private _init(): void {
    }

    private _formChanged(): void {
        const actionDto = {
            action: 'CHANGE_FORM_SERVICE_ITEM',
            data: this.serviceItemForm.invalid
        } as UiActionDto<boolean>;
        this.pubSub.emit(actionDto);
    }

}
