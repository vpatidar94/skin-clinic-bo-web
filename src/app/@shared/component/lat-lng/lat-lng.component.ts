import { NgxGpAutocompleteDirective } from '@angular-magic/ngx-gp-autocomplete';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AddressVo } from 'aayam-clinic-core';
import { UiActionDto } from '../../dto/ui-action.dto';


/*
 *
 <eg-lat-lng [lat]='lat' [lng]='lng' [formattedAddress]='formattedAddress' (change)='searchedAddressUpdated($event)'></eg-lat-lng>
 public searchedAddressUpdated(event: UiActionDto<AddressVo>) {
    switch (event.action) {
      case 'ADDRESS_SET':
        this.searchedAddress = event.data;
        break;
    }
  }
 *
 */
@Component({
    selector: 'app-eg-lat-lng',
    templateUrl: './lat-lng.component.html',
    styleUrls: ['./lat-lng.component.css']
})
export class LatLngComponent implements OnInit {

    /* ************************************* Static Field ********************************************* */

    /* ************************************* Instance Field ******************************************** */
    @Output()
    pubSub = new EventEmitter<any>();

    @Input()
    lat: number | null | undefined;
    @Input()
    lng: number | null | undefined;

    @Input()
    formattedAddress: string | null | undefined; // formatted Address

    @Input()
    placeholder = 'Search Address';
    // pinSetEnable: boolean;
    /*
    0: 'airport'
    1: 'point_of_interest'
    2: 'establishment'

      this.optionsGooglePlaces.types = [];
      this.optionsGooglePlaces.types.push('establishment');
     */
    optionsGooglePlaces: any = { types: [], componentRestrictions: { 'country': [] } };
    @ViewChild('placesRef', { static: true })
    placesRef!: NgxGpAutocompleteDirective;
    @ViewChild('map', { static: true, read: ElementRef })
    mapEle!: ElementRef;

    @Input()
    address: AddressVo | null | undefined; // return on set pin click

    private markedLat!: number; //
    private markedLng!: number; //

    private geocoder = new google.maps.Geocoder();


    /* ************************************* Constructors ******************************************** */
    constructor() {
    }

    /* ************************************* Public Methods ******************************************** */
    public ngOnInit(): void {
        this._init();
    }


    public handleAddressChange(address: google.maps.places.PlaceResult): void {
        const location = {} as any;
        if (address?.geometry?.location) {
            location.lat = address?.geometry?.location.lat();
            location.lng = address.geometry?.location.lng();
        }
        this._markToMap(location, address.place_id);
    }

    /* ************************************* Private Methods ******************************************** */
    private _init(): void {
        if (this.address) {
            const location = { lat: Number(this.address?.lat ?? 0), lng: Number(this.address?.lng ?? 0) };
            this._markToMap(location, this.address?.placeId);
        } else if (this.lat && this.lng) {
            const location = { lat: Number(this.lat ?? 0), lng: Number(this.lng ?? 0) };
            this._markToMap(location, null);
        }
    }

    public _pinSet(): void {
        if (this.address) {
            this.address.lat = this.markedLat;
            this.address.lng = this.markedLng;
            this.address.formatted = this.formattedAddress;
        }
        const actionDto = {
            action: 'ADDRESS_SET',
            data: this.address
        } as UiActionDto<AddressVo>;
        this.pubSub.emit(actionDto);
    }

    private _markToMap(location: any, placeId: string | null | undefined): void {
        this._addMarker(location, placeId);
    }

    // Adds a marker to the map and push to the array.
    private _addMarker(location: any, placeId: string | null | undefined): void {
        this.markedLat = location.lat;
        this.markedLng = location.lng;
        this._geocodeAddress(location, placeId);
    }

    /**
     *
     * @param location = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
     * @param placeId
     * @private
     */
    private _geocodeAddress(location: any, placeId: string | null | undefined): void {
        this._geocodeAddressResult(location, placeId).then((address) => {
            this.formattedAddress = address.formatted_address;
            this.address = this._parseAddress(address.address_components, address.place_id);
            this._pinSet();
        }).catch(error => {
            console.warn(error);
        });
    }

    private _geocodeAddressResult(location: any, placeId: string | null | undefined): Promise<any> {
        const mapParam = placeId ? { placeId } : { location };
        return new Promise((resolve, reject) => {
            this.geocoder.geocode(mapParam, (results: any, status: string) => {
                if (status === 'OK') {
                    if (results[0]) {
                        resolve(results[0]);
                    } else {
                        console.warn('No results found');
                        reject('No results found');
                    }
                } else {
                    console.warn('Geocoder failed due to: ', status);
                    reject(status);
                }
            });
        });
    }

    /*
     address_components
     Array(9)
     0:
     long_name: '263'
     short_name: '263'
     types: ['street_number']

     1:
     long_name: 'Apple Drive'
     short_name: 'Apple Dr'
     types: ['route']

     2:
     long_name: 'Exton'
     short_name: 'Exton'
     types: (2) ['locality', 'political']

     3:
     long_name: 'West Whiteland Township'
     short_name: 'West Whiteland Township'
     types: (2) ['administrative_area_level_3', 'political']

     4:
     long_name: 'Chester County'
     short_name: 'Chester County'
     types: (2) ['administrative_area_level_2', 'political']

     5:
     long_name: 'Pennsylvania'
     short_name: 'PA'
     types: (2) ['administrative_area_level_1', 'political']

     6:
     long_name: 'United States'
     short_name: 'US'
     types: (2) ['country', 'political']

     7:
     long_name: '19341'
     short_name: '19341'
     types: ['postal_code']

     8:
     long_name: '3142'
     short_name: '3142'
     types: ['postal_code_suffix']


     * @param comp - address_components
     * @returns {AddressVo}
     * @private
     */
    private _parseAddress(comp: any, placeId: string): AddressVo {
        const vo: AddressVo = {} as AddressVo;
        vo.street1 = '';
        vo.street2 = '';
        vo.placeId = placeId;
        if (comp) {
            let types;
            comp.forEach((r: any) => {
                types = r.types;
                if (types.indexOf('postal_code_suffix') !== -1) {
                    vo.zipext = r.long_name;
                } else if (types.indexOf('postal_code') !== -1) {
                    vo.zip = r.long_name;
                } else if (types.indexOf('country') !== -1) {
                    vo.country = r.short_name ? r.short_name : r.long_name;
                } else if (types.indexOf('administrative_area_level_1') !== -1) {
                    vo.state = r.short_name ? r.short_name : r.long_name;
                } else if (types.indexOf('locality') !== -1) {
                    vo.city = r.short_name ? r.short_name : r.long_name;
                } else if (types.indexOf('administrative_area_level_2') !== -1 || types.indexOf('administrative_area_level_3') !== -1) {
                    vo.street2 += (r.short_name ? r.short_name : r.long_name) + ' ';
                } else {
                    vo.street1 += (r.short_name ? r.short_name : r.long_name) + ' ';
                }
            });
        }
        return vo;
    }


}
