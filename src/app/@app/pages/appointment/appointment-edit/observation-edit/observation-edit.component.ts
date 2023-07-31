import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookingVo, ObservationVo, UserBookingDto } from 'aayam-clinic-core';
import { UiActionDto } from 'src/app/@shared/dto/ui-action.dto';

@Component({
    selector: 'app-observation-edit',
    templateUrl: './observation-edit.component.html'
})
export class ObservationEditComponent implements OnInit {
    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */
    @Input()
    booking!: UserBookingDto;
    @Output()
    observationChange = new EventEmitter<UserBookingDto>();

    @Input()
    pastBookingList!: Array<UserBookingDto>;

    @Output()
    pubSub = new EventEmitter<any>();

    @ViewChild('observationForm', { static: true })
    observationForm!: NgForm;



    /* ************************************ Constructors ************************************ */
    constructor() {
    }

    /* ************************************ Public Methods ************************************ */
    public ngOnInit(): void {
        this._init();
        // @ts-ignore
        this.observationForm.valueChanges.subscribe(() => {
            this._formChanged();
        });
    }


    /* ************************************ Private Methods ************************************ */
    private _init(): void {
    }

    private _formChanged(): void {
        const actionDto = {
            action: 'CHANGE_FORM_OBSERVATION',
            data: this.observationForm.invalid
        } as UiActionDto<boolean>;
        this.pubSub.emit(actionDto);
    }

}
