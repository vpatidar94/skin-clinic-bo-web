import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InvestigationVo, UserBookingInvestigationDto } from 'aayam-clinic-core';

@Component({
    selector: 'app-appointment-test-edit',
    templateUrl: './appointment-test-edit.component.html',
    styleUrls: ['./appointment-test-edit.component.scss'],
})
export class AppointmentTestEditComponent implements OnInit, OnChanges {
    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */
    investigation!: Array<InvestigationVo>;
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

    /* ************************************ Constructors ************************************ */
    constructor(private dialog: MatDialog) {

    }

    /* ************************************ Public Methods ************************************ */
    patientTests: any = [];
    invest: any = [];

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
        },  //extra field to be added

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
        }   //extra field to be added
        ]
    }


}
