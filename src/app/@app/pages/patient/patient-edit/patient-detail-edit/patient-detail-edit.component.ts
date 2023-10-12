import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiResponse, DepartmentVo, PATIENT_TYPE_LIST, SHIFT_LIST, UserBookingDto, UserBookingInvestigationDto, UserVo } from 'aayam-clinic-core';
import { UserServiceTimingVo } from 'aayam-clinic-core/dist/vo/user-service-timing.vo';
import { GENDER_LIST } from 'src/app/@app/const/gender.consr';
import { UserApi } from 'src/app/@app/service/remote/user.api';
import { UiActionDto } from 'src/app/@shared/dto/ui-action.dto';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';


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


    docterList!: UserVo[];

    doctorConst!: string | null | undefined;

    @Input()
    departmentList!: DepartmentVo[];

    genderList = GENDER_LIST;
    patientTypeList = PATIENT_TYPE_LIST;
    shiftList = SHIFT_LIST;

    docSelectList!: Array<any>;
    selectedDocs = [] as any[];
    dropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        itemsShowLimit: 3,
        allowSearchFilter: true,
        enableCheckAll: false,
        maxHeight: 50
    };

    time!: Array<UserServiceTimingVo>;

    /* ************************************ Constructors ************************************ */
    constructor(
        private userApi: UserApi,
        private keyValueStorageService: KeyValueStorageService,
    ) {
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
                const selected = { item_id: user._id, item_text: `${user.nameF} ${user.nameL}` };
                if (this.userBooking.booking?.dr?.includes(selected.item_id)) {
                    this.selectedDocs.push(selected);
                }
                return selected;
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

        if (changes['departmentList']) {
            this.departmentList = changes['departmentList']?.currentValue as DepartmentVo[];
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
    public onDocSelect(item: any) {
        this.userBooking.booking.dr = this.selectedDocs.map((doc: any) => doc.item_id);
        this.userBookingChange.emit(this.userBooking);
    }

    public calculateAge() {
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

    public filterDoctorByDepartmentId(departmentId: string): void {
        const orgId = this.keyValueStorageService.getOrgId();
        if (!orgId) {
            return;
        }
        this.userApi.getDoctorListByDepartmentId(orgId, departmentId).subscribe((res: ApiResponse<UserVo[]>) => {
            if (res.body && res.body?.length > 0) {
                this.docterList = res.body;
                console.log("xxxxxxx", this.docterList);

            }
        }
        );

    }

    public checkDoctor(selectedDoctor: string | null | undefined): void {
        // Find the doctor based on the selectedDoctor name
        const doctor = this.docterList.find((doc: UserVo) => doc.nameF === selectedDoctor);
        // Check if the doctor is found and if they have serviceTiming
        if (doctor && doctor.serviceTiming && doctor.serviceTiming.length > 0) {
            // Update the userBooking with the selected doctor and their service timings
            // this.userBooking.booking.dr = [doctor.nameF];   // this to be used again when api interface will changed by vinay
            this.doctorConst = doctor.nameF // this will be removed when this.userBooking.booking.dr will be used
            // Update the time variable with the service timings of the selected doctor
            this.time = doctor.serviceTiming;
            // Emit the updated userBooking
            this.userBookingChange.emit(this.userBooking);
        }
    }

    public generateTimeSlots(from: String, to: String): String[] {
        const timeSlots = [];
        const startTime = new Date(`2000-01-01T${from}`);
        const endTime = new Date(`2000-01-01T${to}`);
        const timeGapMinutes = 10;
        while (startTime <= endTime) {
            timeSlots.push(
                startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            );
            // Calculate the next time slot
            startTime.setMinutes(startTime.getMinutes() + timeGapMinutes);

            // Ensure we don't go beyond the 'to' time
            if (startTime > endTime) {
                break;
            }
        }
        return timeSlots;
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
