import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UserProfileVo } from 'src/app/@shared/dto/user-profile.dto';
import { NgForm } from '@angular/forms';
import { GENDER_LIST } from 'src/app/@app/const/gender.consr';
import { AddressVo } from 'aayam-clinic-core';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent {

    userProfile!: UserProfileVo;
    serviceTimingData = [{
        serviceTime: '',
        ampm: 'am',
        serviceTimeEnd: '',
        ampmEnd: 'am'
    }];
    
    ngOnInit(): void {
        const userProfileItem = {} as UserProfileVo;
        userProfileItem.userId = '';
        userProfileItem.date = new Date();
        userProfileItem.firstName = '';
        userProfileItem.lastName = '';
        userProfileItem.gender = '';
        userProfileItem.age = 0;
        userProfileItem.contactNumber = 0;
        userProfileItem.email = '';
        userProfileItem.dob = new Date();
        userProfileItem.userType = '';
        userProfileItem.fatherName = '';
        userProfileItem.alternateNumber = 0;
        userProfileItem.department = '';
        userProfileItem.designation = '';
        userProfileItem.addPhoto = File;
        userProfileItem.uploadIdProof = File;
        userProfileItem.address = {} as AddressVo;
        userProfileItem.serviceTiming = this.serviceTimingData;
        this.userProfile = userProfileItem;
    }
    genderList = GENDER_LIST;
    onSave(): void {
        // console.log(this.userProfile)
    }
    /* ************************************ Constructors ************************************ */



    /* ************************************ Public Methods ************************************ */
    public addServiceTiming() {
        this.userProfile.serviceTiming.push({
            serviceTime: '',
            ampm: 'am',
            serviceTimeEnd: '',
            ampmEnd: 'am'
        });
    }

    public removeServiceTiming(index:number): void {
        this.userProfile.serviceTiming.splice(index,1);
    }


    /* ************************************ Private Methods ************************************ */

}