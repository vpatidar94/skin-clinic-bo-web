import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import { AddressVo } from 'aayam-clinic-core';
import { UiActionDto } from '../../dto/ui-action.dto';

@Component({
    selector: 'app-eg-edit-address',
    templateUrl: './edit-address.component.html',
    styleUrls: []
})
export class EditAddressComponent implements OnInit {

    @Input()
    address: AddressVo | null | undefined;
    @Output()
    addressChange = new EventEmitter<AddressVo | null | undefined>();

    @Output()
    pubSub = new EventEmitter<any>();

    @Input()
    placeholder = 'Search Address';

    @ViewChild('addressForm', {static: true})
    addressFormVal!: NgForm;

    stateItems: any = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];

    searchedAddress!: AddressVo;
    lat: number | null | undefined;
    lng: number | null | undefined;
    formattedAddress: string | null | undefined;

    /* ******************************** Constructors ****************************************** */
    constructor() {
    }

    /* ******************************** Public Methods ****************************************** */
    public ngOnInit(): void {
        if (!this.address) {
            this.address = ({} as AddressVo);
        }
        this.lat = this.address.lat;
        this.lng = this.address.lng;
        this.formattedAddress = this.address.formatted;

        // @ts-ignore
        this.addressFormVal?.valueChanges?.subscribe(() => {
            this._formChanged();
        });
    }

    public searchedAddressUpdated(event: UiActionDto<AddressVo>): void {
        switch (event.action) {
            case 'ADDRESS_SET':
                this.searchedAddress = event.data;
                this.copyAddress();
                break;
        }
    }

    public copyAddress(): void {
        if (!this.address) {
            return;
        }
        this.address.street1 = this.searchedAddress.street1;
        this.address.street2 = this.searchedAddress.street2;
        this.address.landmark = this.searchedAddress.landmark;
        this.address.city = this.searchedAddress.city;
        this.address.zip = this.searchedAddress.zip;
        this.address.state = this.searchedAddress.state;
        this.address.lat = this.searchedAddress.lat;
        this.address.lng = this.searchedAddress.lng;
        this.address.placeId = this.searchedAddress.placeId;
        this.address.formatted = this.searchedAddress.formatted; // formatted Address
        this.address.country = this.searchedAddress.country; // formatted Address
        this.addressChange.emit(this.address);
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
