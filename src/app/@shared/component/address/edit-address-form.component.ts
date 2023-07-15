import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import { AddressVo } from 'aayam-clinic-core';
import { UiActionDto } from '../../dto/ui-action.dto';

@Component({
    selector: 'app-eg-edit-address-form',
    templateUrl: './edit-address-form.component.html',
    styleUrls: []
})
export class EditAddressFormComponent implements OnInit {

    @Input()
    address: AddressVo | null | undefined;
    
    @Output()
    addressChange = new EventEmitter<AddressVo | null | undefined>();

    @Output()
    pubSub = new EventEmitter<any>();

    @ViewChild('addressForm', {static: true})
    addressFormVal!: NgForm;


    /* ******************************** Constructors ****************************************** */
    constructor() {
    }

    /* ******************************** Public Methods ****************************************** */
    public ngOnInit(): void {
        if (!this.address) {
            this.address = ({} as AddressVo);
        }
        // @ts-ignore
        this.addressFormVal.valueChanges.subscribe(() => {
            this._formChanged();
        });
    }

    /* ******************************** Private Methods ****************************************** */
    private _formChanged(): void {
        const actionDto = {
            action: 'CHANGE_FORM_ADDRESS',
            data: this.addressFormVal.invalid
        } as UiActionDto<boolean>;
        this.pubSub.emit(actionDto);
    }

}
