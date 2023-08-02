import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BOOKING_TYPE_LIST, UserBookingDto, UserVo } from 'aayam-clinic-core';
import { GENDER_LIST } from 'src/app/@app/const/gender.consr';
import { UiActionDto } from 'src/app/@shared/dto/ui-action.dto';


@Component({
    selector: 'app-patient-edit',
    templateUrl: './patient-edit.component.html',
    styleUrls: ['./patient-edit.component.scss'],
})
export class PatientEditComponent implements OnInit, OnChanges {
    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */
    inValidAddressForm!: boolean;

    @Input()
    userBooking!: UserBookingDto;
    @Output()
    userBookingChange = new EventEmitter<UserBookingDto>();

    @Output()
    pubSub = new EventEmitter<any>();

    @ViewChild('patientForm', { static: true })
    patientForm!: NgForm;

    @Input()
    docterList!: UserVo[];

    genderList = GENDER_LIST;
    patientTypeList = BOOKING_TYPE_LIST;

    docSelectList!: Array<any>;
    selectedDocs = [];
    dropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        itemsShowLimit: 3,
        allowSearchFilter: true,
        enableCheckAll: false,
        maxHeight: 50
    };



    /* ************************************ Constructors ************************************ */
    constructor() {
    }

    /* ************************************ Public Methods ************************************ */
    public ngOnInit(): void {
        this._init();
        // @ts-ignore
        this.patientForm.valueChanges.subscribe(() => {
            this._formChanged();
        });
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['docterList']) {
            this.docterList = changes['docterList'].currentValue;
            this.docSelectList = this.docterList.map((user: UserVo) => {
                return { item_id: user._id, item_text: `${user.nameF} ${user.nameL}` };
            });
        }
    }

    public addressFormChange(event: UiActionDto<boolean>): void {
        switch (event.action) {
            case 'CHANGE_FORM_ADDRESS':
                this.inValidAddressForm = event.data;
                this._formChanged();
                this.userBookingChange.emit(this.userBooking);
                break;
        }
    }

    // multiple select
    onDocSelect(item: any) {
        this.userBooking.booking.dr = this.selectedDocs.map((doc: any) => doc.item_id);
        this.userBookingChange.emit(this.userBooking);
    }

    /* ************************************ Private Methods ************************************ */
    private _init(): void {
    }

    private _formChanged(): void {
        const actionDto = {
            action: 'CHANGE_FORM_PATIENT',
            data: this.patientForm.invalid || this.inValidAddressForm
        } as UiActionDto<boolean>;
        this.pubSub.emit(actionDto);
    }
}
