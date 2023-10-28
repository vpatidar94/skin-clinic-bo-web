import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-view-patient',
    templateUrl: './view-patient.component.html',
})

export class ViewPatientComponent implements OnInit {

    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */

    showSectionPrescription!: boolean;
    showSectionBilling!: boolean;

    tabValue!: string;

    /* ************************************* Constructor ******************************************** */

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
        this.tabValue = 'PRESCRIPTION'
        this.tabChange();
    }

    private _tabChange(tabValue: string): void {
        switch (tabValue) {
            case 'PRESCRIPTION':
                this._resetSection();
                this.showSectionPrescription = true;
                break;
            case 'BILLING':
                this._resetSection();
                this.showSectionBilling = true;
                break;
        }
    }

    private _resetSection(): void {
        this.showSectionPrescription = false;
        this.showSectionBilling = false;
    }
}