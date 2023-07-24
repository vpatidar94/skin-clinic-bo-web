import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ROLE, UserVo } from 'aayam-clinic-core';
import { GENDER_LIST } from 'src/app/@app/const/gender.consr';
import { UiActionDto } from 'src/app/@shared/dto/ui-action.dto';

@Component({
    selector: 'app-patient-edit',
    templateUrl: './patient-edit.component.html'
})
export class PatientEditComponent implements OnInit {
    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */
    inValidAddressForm!: boolean;

    @Input()
    patient!: UserVo;
    @Output()
    patientChange = new EventEmitter<UserVo>();

    @Output()
    pubSub = new EventEmitter<any>();

    @ViewChild('patientForm', { static: true })
    patientForm!: NgForm;

    genderList = GENDER_LIST;


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

    public addressFormChange(event: UiActionDto<boolean>): void {
        switch (event.action) {
            case 'CHANGE_FORM_ADDRESS':
                this.inValidAddressForm = event.data;
                this._formChanged();
                break;
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
