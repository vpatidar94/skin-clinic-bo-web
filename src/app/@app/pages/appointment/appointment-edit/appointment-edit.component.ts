import { Component, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { GENDER_LIST } from 'src/app/@app/const/gender.consr';
import { ApiResponse, DepartmentVo, ItemDetailDto, SHIFT_LIST, UserBookingDto, UserBookingInvestigationDto, UserVo } from 'aayam-clinic-core';
import { UserServiceTimingVo } from 'aayam-clinic-core/dist/vo/user-service-timing.vo';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { UserApi } from 'src/app/@app/service/remote/user.api';

@Component({
    selector: 'app-appointment-edit',
    templateUrl: './appointment-edit.component.html',
    styleUrls: ['./appointment-edit.component.scss']
})
export class AppointmentEditComponent {
    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */
    genderList = GENDER_LIST;
    shiftList = SHIFT_LIST;
    dob!: string;
    age: number | null = null;

    selectedDoctorId!: any;

    @Input()
    serviceItemList!: ItemDetailDto[];

    filteredServiceItemList!: ItemDetailDto[];

    docterList!: UserVo[];

    @Input()
    userBooking!: UserBookingDto;

    @Output()
    userBookingChange = new EventEmitter<UserBookingDto>();

    @Output()
    pubSub = new EventEmitter<any>();

    @Input()
    userBookingInvestigationList!: UserBookingInvestigationDto;

    @Input()
    departmentList!: DepartmentVo[];

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

    time!: Array<UserServiceTimingVo>;

    showShifts: boolean = false;

    selectedShift: number | null = null;

    selectedTimeSlots: (number | null)[] = [];

    showOnlySelectedTimeSlot = false;
    /* ************************************* Constructors ******************************************** */
    constructor(private keyValueStorageService: KeyValueStorageService,
        private userApi: UserApi) { }

    /* ************************************* Public Methods ******************************************** */
    public calculateAge() {
        if (this.userBooking.user.doB) {
            const dobDate = new Date(this.userBooking.user.doB);
            const today = new Date();
            const ageDiff = today.getFullYear() - dobDate.getFullYear();
            // Check if the birthday has already occurred this year
            if (
                today.getMonth() < dobDate.getMonth() ||
                (today.getMonth() === dobDate.getMonth() && today.getDate() < dobDate.getDate())
            ) {
                this.userBooking.user.age = ageDiff - 1; // Subtract 1 if birthday hasn't occurred yet this year
            } else {
                this.userBooking.user.age = ageDiff; // Birthday has occurred this year
            }
        }
        else {
            this.userBooking.user.age = null; // Reset the age if DOB is not provided
        }
    }

    public filterServiceItemByDoctor(selectedDoctorId: string) {
        this.filteredServiceItemList = this.serviceItemList.filter(item => item.item.associatedDoctorId === selectedDoctorId);

    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['doctorList']) {
            this.docterList = changes['doctorList'].currentValue;
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

    public filterDoctorByDepartmentId(departmentId: string, fetchTimeSlot: boolean = false): void {
        const orgId = this.keyValueStorageService.getOrgId();
        if (!orgId) {
            return;
        }
        this.userApi.getDoctorListByDepartmentId(orgId, departmentId).subscribe((res: ApiResponse<UserVo[]>) => {
            if (res.body && res.body?.length > 0) {
                this.docterList = res.body;
                if (this.userBooking.booking?.dr && fetchTimeSlot) {

                    this.checkDoctor(this.userBooking.booking?.dr, this.userBooking.booking.dr);
                }
            }
        }
        );
    }

    public checkDoctor(selectedDoctor: string | null | undefined, doctorId: string): void {
        // Find the doctor based on the selectedDoctor name
        const doctor = this.docterList.find((doc: UserVo) => doc._id === selectedDoctor);
        // Check if the doctor is found and if they have serviceTiming
        if (doctor && doctor.serviceTiming && doctor.serviceTiming.length > 0) {
            // Update the userBooking with the selected doctor and their service timings
            // this.userBooking.booking.dr = [doctor.nameF];   // TODO: this to be used again when api interface will be changed as per needed
            // Update the time variable with the service timings of the selected doctor
            this.time = doctor.serviceTiming;
            doctorId = this.userBooking.booking.dr;
            this.filterServiceItemByDoctor(doctorId);
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
}