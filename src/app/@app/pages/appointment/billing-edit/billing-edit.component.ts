import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { ObservationVo } from 'aayam-clinic-core';
import { ConfirmDeleteDialogComponent } from 'src/app/@shared/component/dialog/confirm-delete-dialog.component';
import { UiActionDto } from 'src/app/@shared/dto/ui-action.dto';

@Component({
    selector: 'app-billing-edit',
    templateUrl: './billing-edit.component.html',
    styleUrls: ['./billing-edit.component.scss'],
})
export class BillingEditComponent implements OnInit {
    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */

    @Input()
    billing!: Array<string>;
    @Output()
    billingChange = new EventEmitter<Array<string>>();

    @Output()
    pubSub = new EventEmitter<any>();

    @ViewChild('billingForm', { static: true })
    billingForm!: NgForm;

    panelOpenState = false;

    /* ************************************ Constructors ************************************ */
    constructor(private dialog: MatDialog) {

    }

    /* ************************************ Public Methods ************************************ */
    // public ngOnInit(): void {
    //     this._init();
    //     // @ts-ignore
    //     this.testForm.valueChanges.subscribe(() => {
    //         this._formChanged();
    //     });
    // }

    // public addTestSuggestion(): void {
    //     this.test.push("");
    // }

    // public removeTestSuggestion(index: number): void {
    //     this._confirmRemoveItem(index);
    // }

    // public trackByIndex(index: number, obj: any): any {
    //     return index;
    // }


    // /* ************************************ Private Methods ************************************ */
    // private _init(): void {
    // }

    // private _confirmRemoveItem(index: number): void {
    //     const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
    //         width: '250px',
    //         data: { key: 'test' }
    //     });

    //     dialogRef.afterClosed().subscribe(result => {
    //         if (result) {
    //             this.test.splice(index, 1);
    //         }
    //     });
    // }

    // private _formChanged(): void {
    //     const actionDto = {
    //         action: 'CHANGE_FORM_TEST',
    //         data: this.testForm.invalid
    //     } as UiActionDto<boolean>;
    //     this.pubSub.emit(actionDto);
    // }

    bill: any = []
    public ngOnInit(): void {
        this.bill = [{
            "booking_id": 1021,
            "testsArray": ["Lipid", "blood Test"]
        },
        {
            "booking_id": 1022,
            "testsArray": ["blood Test", "x-ray"]
        }]
    }
}