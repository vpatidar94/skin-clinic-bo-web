import { Component, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { GENDER_LIST } from 'src/app/@app/const/gender.consr';
import { ItemDetailDto, SHIFT_LIST, UserBookingDto, UserBookingInvestigationDto, UserVo } from 'aayam-clinic-core';

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

    @Input()
    doctorList!: UserVo[];

    @Input()
    userBooking!: UserBookingDto;
   
    @Output()
    userBookingChange = new EventEmitter<UserBookingDto>();

    @Output()
    pubSub = new EventEmitter<any>();

    @Input()
    userBookingInvestigationList!: UserBookingInvestigationDto;

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
    /* ************************************* Constructors ******************************************** */
    constructor() { }

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
        this.filteredServiceItemList = this.serviceItemList.filter(item => item.item.associatedDoctorId === selectedDoctorId );

    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['doctorList']) {
            this.doctorList = changes['doctorList'].currentValue;
            this.docSelectList = this.doctorList?.map((user: UserVo) => {
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
}