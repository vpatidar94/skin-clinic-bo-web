import { EmailValidator } from "@angular/forms";
import { AddressVo } from "aayam-clinic-core";
import { ServiceTimingVo } from "./service-timing.dto";

export interface UserProfileVo {
    userId: string;
    date: Date;
    firstName: string;
    lastName: string;
    gender: string;
    age: Number;
    contactNumber: Number;
    email: any;
    dob: Date;
    userType: string;
    fatherName: string;
    alternateNumber: Number;
    department: string;
    departmentId: string;
    designation: string;
    addPhoto: any;
    uploadIdProof: any;
    address: AddressVo ;
    city: string;
    district: string;
    state: string;
    serviceTiming:Array<ServiceTimingVo>;




}