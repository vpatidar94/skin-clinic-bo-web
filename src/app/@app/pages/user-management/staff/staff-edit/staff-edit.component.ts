import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ROLE, ROLE_LIST, UserEmpDto } from 'aayam-clinic-core';
import { GENDER_LIST } from 'src/app/@app/const/gender.consr';
import { SUB_ROLE_LIST } from 'src/app/@app/const/sub-role.const';
import { UiActionDto } from 'src/app/@shared/dto/ui-action.dto';

@Component({
    selector: 'app-staff-edit',
    templateUrl: './staff-edit.component.html'
})
export class StaffEditComponent implements OnInit {
    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */
    inValidAddressForm!: boolean;

    @Input()
    staff!: UserEmpDto;
    @Output()
    staffChange = new EventEmitter<UserEmpDto>();

    @Output()
    pubSub = new EventEmitter<any>();

    @ViewChild('staffForm', { static: true })
    staffForm!: NgForm;

    subRoleList = SUB_ROLE_LIST;
    genderList = GENDER_LIST;
    roleList = ROLE_LIST;

    emp = ROLE.EMP;

    maxDateDob = new Date();


    /* ************************************ Constructors ************************************ */
    constructor() {
    }

    /* ************************************ Public Methods ************************************ */
    public ngOnInit(): void {
        this._init();
        // @ts-ignore
        this.staffForm.valueChanges.subscribe(() => {
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
            action: 'CHANGE_FORM_STAFF',
            data: this.staffForm.invalid || this.inValidAddressForm
        } as UiActionDto<boolean>;
        this.pubSub.emit(actionDto);
    }

}
