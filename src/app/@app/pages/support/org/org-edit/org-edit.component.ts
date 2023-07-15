import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddressVo, MessageService, MessageType, OrgVo } from 'aayam-clinic-core';
import { UiActionDto } from 'src/app/@shared/dto/ui-action.dto';
import { GlobalEmitterService } from 'src/app/@shared/service/global-emitter.service';
import { ORG_TYPE_LIST } from '../../../../const/org-type.const'

@Component({
    selector: 'app-org-edit',
    templateUrl: './org-edit.component.html'
})
export class OrgEditComponent implements OnInit {
    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */
    inValidAddressForm!: boolean;
    invalidPh!: boolean;

    @Input()
    orgBr!: OrgVo;
    @Output()
    orgBrChange = new EventEmitter<OrgVo>();

    @Output()
    pubSub = new EventEmitter<any>();

    @ViewChild('orgForm', { static: true })
    orgForm!: NgForm;

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
        this.orgForm.valueChanges.subscribe(() => {
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

    public getNumber(cell: string): void {
        this.orgBr.ph = cell;
        this.orgBrChange.emit(this.orgBr);
    }

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

    public setDbaAddress(): void {
        this.orgBr.address = {} as AddressVo;
    }

    /* ************************************ Cell Methods End ************************************ */

    /* ************************************ Private Methods ************************************ */
    private _init(): void {
    }

    private _formChanged(): void {
        const actionDto = {
            action: 'CHANGE_FORM_ORG',
            data: this.orgForm.invalid || this.inValidAddressForm || this.invalidPh
        } as UiActionDto<boolean>;
        this.pubSub.emit(actionDto);
    }

}
