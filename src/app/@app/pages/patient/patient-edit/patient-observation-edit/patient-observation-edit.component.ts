import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HEALTH_PARAMS_LIST, KeyValueVo, UserBookingDto, UserBookingInvestigationDto, UserVo } from 'aayam-clinic-core';
import { UserApi } from 'src/app/@app/service/remote/user.api';
import { UiActionDto } from 'src/app/@shared/dto/ui-action.dto';

@Component({
    selector: 'app-patient-observation-edit',
    templateUrl: './patient-observation-edit.component.html'
})
export class PatientObservationEditComponent implements OnInit, OnChanges {
    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */
    @Input()
    userBooking!: UserBookingDto;
    @Output()
    userBookingChange = new EventEmitter<UserBookingDto>();

    @Input()
    pastBookingList!: Array<UserBookingDto>;

    @Input()
    doctorList!: UserVo[];

    @Input()
    userBookingInvestigationList!: UserBookingInvestigationDto;

    @Output()
    pubSub = new EventEmitter<any>();

    @ViewChild('observationForm', { static: true })
    observationForm!: NgForm;

    healtParamList = HEALTH_PARAMS_LIST;
    showSectionAdd = false;

    paramSelectList!: Array<any>;
    selectedParams = [] as Array<any>;
    dropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        itemsShowLimit: 3,
        allowSearchFilter: true,
        enableCheckAll: false,
        maxHeight: 500
    };
    folder = 'OBSERVATION/295/';
    images: string[] = [];

    /* ************************************ Constructors ************************************ */
    constructor(private userApi: UserApi,) {
    }

    /* ************************************ Public Methods ************************************ */
    public ngOnInit(): void {
        this._init();
        // @ts-ignore
        this.observationForm?.valueChanges?.subscribe(() => {
            this._formChanged();
        });
        this.showSectionAdd = this.userBooking.booking.observation?.healthParams?.length > 0;

        this.userApi.getImages("OBSERVATION" + "/" + this.userBooking.booking.patientNo).subscribe(
            (data) => {
                this.images = data;
                console.log("data", data);

                console.log("data", this.images);

            },
            (error) => {
                console.error('Failed to fetch images', error);
            }
        );
    }

    public addNewObservation(): void {
        this.showSectionAdd = true;
    }

    public onParamSelect(item: any) {
        this.userBooking.booking.observation.healthParams = this.selectedParams.map((it: any) => {
            return {
                key: it.item_id,
                name: it.item_text,
                value: ''
            } as KeyValueVo;
        });
        this.userBookingChange.emit(this.userBooking);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['userBookingInvestigationList']) {
            this.userBookingInvestigationList = changes['userBookingInvestigationList'].currentValue as UserBookingInvestigationDto;
        }
    }

    public getDoctorById(Id: string | null | undefined): string | null | undefined {
        const doctorId = Id;
        const doctor = this.doctorList?.find(doc => doc._id === doctorId);
        return doctor ? doctor.nameF + " " + doctor.nameL : "";
    }

    /* ************************************ Private Methods ************************************ */
    private _init(): void {
        this.paramSelectList = this.healtParamList.map((it: any) => {
            return { item_id: it.id, item_text: it.name };
        });
    }

    private _formChanged(): void {
        const actionDto = {
            action: 'CHANGE_FORM_OBSERVATION',
            data: this.observationForm.invalid
        } as UiActionDto<boolean>;
        this.pubSub.emit(actionDto);
    }
}
