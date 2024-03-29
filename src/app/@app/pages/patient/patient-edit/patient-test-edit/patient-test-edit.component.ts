import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InvestigationVo, UserBookingInvestigationDto, UserVo } from 'aayam-clinic-core';

@Component({
    selector: 'app-patient-test-edit',
    templateUrl: './patient-test-edit.component.html',
    styleUrls: ['./patient-test-edit.component.scss'],
})

export class PatientTestEditComponent implements OnInit, OnChanges {
    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */
    investigation!: Array<InvestigationVo>;
   
    @Input()
    doctorList!: UserVo[];

    @Input()
    test!: Array<string>;
    @Output()
    testChange = new EventEmitter<Array<string>>();

    @Output()
    pubSub = new EventEmitter<any>();

    @ViewChild('testForm', { static: true })
    testForm!: NgForm;

    panelOpenState = false;

    @Input()
    userBookingInvestigationList!: UserBookingInvestigationDto;

    patientTests: any = [];
    invest: any = [];

    /* ************************************ Constructors ************************************ */
    constructor(private dialog: MatDialog) { }

    /* ************************************ Public Methods ************************************ */
    

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['userBookingInvestigationList']) {
            this.userBookingInvestigationList = changes['userBookingInvestigationList'].currentValue as UserBookingInvestigationDto;
        }
    }

    public ngOnInit(): void {
        this.invest = [{
            _id: "12",
            name: "Jitu",
            patientId: "123",
            bookingId: "1234",
            orgId: "002",
            dr: "Dr. Keshav",
            date: "31/07/2023",
            created: Date,
            url: "http://aayam",
            testsArray: ["Lipid", "blood Test"]
        },

        {
            _id: "13",
            name: "Jitu",
            patientId: "123",
            bookingId: "3525",
            orgId: "002",
            dr: "Dr. Mayank",
            date: "25/06/2023",
            created: Date,
            url: "http://aayam",
            testsArray: ["blood Test", "CBT", "x-ray"]
        }
        ]
    }

    public getDoctorById(Id: string|null |undefined ): string|null |undefined {
        const doctorId = Id;
        const doctor = this.doctorList?.find(doc => doc._id === doctorId);
        return doctor ? doctor.nameF + " " + doctor.nameL : "";
      }
}
