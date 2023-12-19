import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrgBookingDto } from 'aayam-clinic-core';

@Component({
    selector: 'app-view-investigation',
    templateUrl: './view-investigation.component.html',
})

export class ViewInvestigationComponent implements OnInit {

    /* ************************************* Instance Field ******************************************** */
    showSectionTestSamplesDetails!: boolean;
    showSectionReports!: boolean;

    tabValue!: string;

    @Input()
    booking!: OrgBookingDto;
    @Output()
    bookingChange = new EventEmitter<OrgBookingDto>();

    /* ************************************* Constructors ******************************************** */
    constructor() { }

    /* ************************************* Public Methods ******************************************** */
    public ngOnInit(): void {
        this._init();
    }

    public tabChange(): void {
        this._tabChange(this.tabValue);
    }

    /* ************************************* Private Methods ******************************************** */
    private _init(): void {
        this.tabValue = 'TEST_SAMPLE_DETAILS'
        this.tabChange();

    }
    private _tabChange(tabValue: string): void {
        switch (tabValue) {
            case 'TEST_SAMPLE_DETAILS':
                this._resetSection();
                this.showSectionTestSamplesDetails = true;
                break;
            case 'TEST_REPORTS':
                this._resetSection();
                this.showSectionReports = true;
                break;
        }
    }

    private _resetSection(): void {
        this.showSectionTestSamplesDetails = false;
        this.showSectionReports = false;
    }

}