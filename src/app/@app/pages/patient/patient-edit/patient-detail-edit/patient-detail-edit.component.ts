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

    @Input()
    departmentList!: DepartmentVo[];

    genderList = GENDER_LIST;
    patientTypeList = PATIENT_TYPE_LIST;
    shiftList = SHIFT_LIST;

    time!: Array<UserServiceTimingVo>;

    showShifts: boolean = false;

    selectedShift: number | null = null;

    selectedTimeSlots: (number | null)[] = [];

    showOnlySelectedTimeSlot: boolean = false;

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
        if (changes['userBookingInvestigationList']) {
            this.userBookingInvestigationList = changes['userBookingInvestigationList'].currentValue as UserBookingInvestigationDto;
            if (this.userBookingInvestigationList?.user?._id) {
                this.userBooking.booking.user = this.userBookingInvestigationList?.user?._id;
                this.userBooking.user = this.userBookingInvestigationList?.user;
                if (this.userBooking.booking?.departmentId) {
                    this.filterDoctorByDepartmentId(this.userBooking.booking?.departmentId, true);
                }
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

    public filterDoctorByDepartmentId(departmentId: string, fetchTimeSlot: boolean = false): void {
        const orgId = this.keyValueStorageService.getOrgId();
        if (!orgId) {
            return;
        }
        this.userApi.getDoctorListByDepartmentId(orgId, departmentId).subscribe((res: ApiResponse<UserVo[]>) => {
            if (res.body && res.body?.length > 0) {
                this.docterList = res.body;
                if (this.userBooking.booking?.dr && fetchTimeSlot) {
                    this.checkDoctor(this.userBooking.booking?.dr);
                }
            }
        }
        );
    }

    public checkDoctor(selectedDoctor: string | null | undefined): void {
        // Find the doctor based on the selectedDoctor name
        const doctor = this.docterList.find((doc: UserVo) => doc._id === selectedDoctor);
        // Check if the doctor is found and if they have serviceTiming
        if (doctor && doctor.serviceTiming && doctor.serviceTiming.length > 0) {
            // Update the userBooking with the selected doctor and their service timings
            // this.userBooking.booking.dr = [doctor.nameF];   // TODO: this to be used again when api interface will be changed as per needed
            // Update the time variable with the service timings of the selected doctor
            this.time = doctor.serviceTiming;
        }
    }

    public generateTimeSlots(from: String, to: String): string[] {
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

            // Ensure not to go beyond the 'to' time
            if (startTime > endTime) {
                break;
            }
        }
        this.showOnlySelectedTimeSlot = false;
        return timeSlots;
    }

    public selectShift(index: number) {
        this.selectedShift = index;
        // this.userBooking.booking.shift = this.selectShift.toString();
    }

    public selectTimeSlot(shiftIndex: number, slotIndex: number) {
        const selectedTimeSlot = this.generateTimeSlots(this.time[shiftIndex].from, this.time[shiftIndex].to)[slotIndex];
        this.userBooking.booking.timeSlot = selectedTimeSlot;
        this.selectedTimeSlots[shiftIndex] = slotIndex;
        this.showOnlySelectedTimeSlot = true;
    }

    public toggleShift(shiftIndex: number) {
            if (this.selectedShift === shiftIndex) {
                this.selectedShift = null;
                this.showOnlySelectedTimeSlot = false;
            } else {
                this.selectedShift = shiftIndex;
                this.showOnlySelectedTimeSlot = false;
            }
    }


    /* ************************************ Private Methods ************************************ */
    private _init(): void {
        /* to show the previous booking selected time slot */
        if (this.userBooking.booking.timeSlot) {
            this.showOnlySelectedTimeSlot = true;
        }
        else {
            this.showOnlySelectedTimeSlot = false;
        }
    }

    private _formChanged(): void {
        const actionDto = {
            action: 'CHANGE_FORM_PATIENT',
            data: this.patientForm.invalid || this.inValidAddressForm
        } as UiActionDto<boolean>;
        this.pubSub.emit(actionDto);
    }

}
