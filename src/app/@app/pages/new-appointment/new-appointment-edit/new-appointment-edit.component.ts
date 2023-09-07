import { Component, Input, } from '@angular/core';
// import { DepartmentVo} from 'aayam-clinic-core';

import { GENDER_LIST } from 'src/app/@app/const/gender.consr';
import { ItemDetailDto, SHIFT_LIST, UserVo } from 'aayam-clinic-core';


@Component({
    selector: 'app-new-appointment-edit',
    templateUrl: './new-appointment-edit.component.html',
    styleUrls: ['./new-appointment-edit.component.scss']
})
export class NewAppointmentEditComponent {
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
    /* ************************************* Constructors ******************************************** */
    constructor() { }

    /* ************************************* Public Methods ******************************************** */
    public calculateAge() {
        if (this.dob) {
            const dobDate = new Date(this.dob);
            const today = new Date();
            const ageDiff = today.getFullYear() - dobDate.getFullYear();

            // Check if the birthday has already occurred this year
            if (
                today.getMonth() < dobDate.getMonth() ||
                (today.getMonth() === dobDate.getMonth() && today.getDate() < dobDate.getDate())
            ) {
                this.age = ageDiff - 1; // Subtract 1 if birthday hasn't occurred yet this year
            } else {
                this.age = ageDiff; // Birthday has occurred this year
            }
        }
        else {
            this.age = null; // Reset the age if DOB is not provided
        }
    }

    public filterServiceItemByDoctor(selectedDoctorId: string | null | undefined) {
        this.filteredServiceItemList = this.serviceItemList.filter(item => item.item.associatedDoctorId ===selectedDoctorId );
        console.log('filtered',this.filteredServiceItemList);
    }
}