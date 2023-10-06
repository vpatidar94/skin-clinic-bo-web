import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PATIENT_TYPE_LIST, SHIFT_LIST, UserBookingDto, UserBookingInvestigationDto, UserVo } from 'aayam-clinic-core';
import { GENDER_LIST } from 'src/app/@app/const/gender.consr';
import { UiActionDto } from 'src/app/@shared/dto/ui-action.dto';


@Component({
    selector: 'app-patient-detail-edit',
    templateUrl: './patient-detail-edit.component.html',
    styleUrls: ['./patient-detail-edit.component.scss'],
})
export class PatientDetailEditComponent implements OnInit, OnChanges {
    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */
    inValidAddressForm!: boolean;

    @Input()
    userBooking!: UserBookingDto;
    @Output()
    userBookingChange = new EventEmitter<UserBookingDto>();

    @Output()
    pubSub = new EventEmitter<any>();

    @Input()
    userBookingInvestigationList!: UserBookingInvestigationDto;

    @ViewChild('patientForm', { static: true })
    patientForm!: NgForm;

    @Input()
    docterList!: UserVo[];

    genderList = GENDER_LIST;
    patientTypeList = PATIENT_TYPE_LIST;
    shiftList = SHIFT_LIST;

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
            this.docSelectList = this.docterList?.map((user: UserVo) => {
                return { item_id: user._id, item_text: `${user.nameF} ${user.nameL}` };
            });
        }
        if (changes['userBookingInvestigationList']) {
            this.userBookingInvestigationList = changes['userBookingInvestigationList'].currentValue as UserBookingInvestigationDto;
            if (this.userBookingInvestigationList?.user?._id) {
                this.userBooking.booking.user = this.userBookingInvestigationList?.user?._id;
                this.userBooking.user = this.userBookingInvestigationList?.user;
            }
            this.userBookingChange.emit(this.userBooking);
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

    calculateAge() {
        const dob = this.userBooking.user.doB;
        if (dob) {
            const today = new Date();
            const birthDate = new Date(dob);
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDifference = today.getMonth() - birthDate.getMonth();

            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            this.userBooking.user.age = age;
        }
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
