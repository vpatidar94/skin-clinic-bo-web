import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ItemVo, MessageService, MessageType, UserVo } from 'aayam-clinic-core';
import { UiActionDto } from 'src/app/@shared/dto/ui-action.dto';
import { GlobalEmitterService } from 'src/app/@shared/service/global-emitter.service';
import { ORG_TYPE_LIST } from '../../../../const/org-type.const';

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

    @Input()
    doctorList!: Array<UserVo>;

    @Output()
    pubSub = new EventEmitter<any>();

    @ViewChild('serviceItemForm', { static: true })
    serviceItemForm!: NgForm;

    orgTypeList = ORG_TYPE_LIST;

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

    public telInputObject(): void {

    }

    public onCountryChange(e: any): void {
        console.log('onCountryChange ', e);
    }

    public getSelectedServiceToServer(): void {
    }

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
