import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-view-investigation',
    templateUrl: './view-investigation.component.html',
})

export class ViewInvestigationComponent implements OnInit {

    /* ************************************* Instance Field ******************************************** */
    showSectionTestSamplesDetails!: boolean;
    showSectionReports!: boolean;

    tabValue!: string;
    constructor(private route: ActivatedRoute) { }

    /* ************************************* Public Methods ******************************************** */
    public ngOnInit(): void {
        this._init();
    }

    public tabChange(): void {
        this._tabChange(this.tabValue);
    }

    /* ************************************* Private Methods ******************************************** */
    private _init(): void {
        this.tabValue = 'TESTSAMPLEDETAILS'
        this.tabChange();

    }
    private _tabChange(tabValue: string): void {
        switch (tabValue) {
            case 'TESTSAMPLEDETAILS':
                this._resetSection();
                this.showSectionTestSamplesDetails = true;
                break;
            case 'REPORTS':
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