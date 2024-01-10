import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { OrderItemVo, ProductVo } from 'aayam-clinic-core';

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

    selectedMedicine!: Array<string>;

    /* ************************************* Constructor ******************************************** */

    constructor(private route: ActivatedRoute,
        public dialogRef: MatDialogRef<ViewPatientComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    /* ************************************* Public Methods ******************************************** */
    public ngOnInit(): void {
        this._init();
    }

    public tabChange(): void {
        this._tabChange(this.tabValue);
    }

    /* ************************************* Private Methods ******************************************** */
    private _init(): void {
        this.selectedMedicine = [] as string[];
        this.tabValue = 'PRESCRIPTION'
        this.tabChange();
        // this.selectedMedicine
        if (this.data.pharmacyOrder?.order?.items?.length > 0) { 
            this.data.pharmacyOrder.order?.items?.forEach((oi: OrderItemVo) => {
                const item = oi.item as ProductVo | null;
                if (item) {
                    this.selectedMedicine.push(item._id);
                }
            });
        }
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