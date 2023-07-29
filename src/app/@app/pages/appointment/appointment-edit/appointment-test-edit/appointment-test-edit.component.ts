import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { ObservationVo } from 'aayam-clinic-core';
import { ConfirmDeleteDialogComponent } from 'src/app/@shared/component/dialog/confirm-delete-dialog.component';
import { UiActionDto } from 'src/app/@shared/dto/ui-action.dto';

@Component({
    selector: 'app-appointment-test-edit',
    templateUrl: './appointment-test-edit.component.html',
    styleUrls: ['./appointment-test-edit.component.scss'],
})
export class AppointmentTestEditComponent implements OnInit {
    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */

    @Input()
    test!: Array<string>;
    @Output()
    testChange = new EventEmitter<Array<string>>();

    @Output()
    pubSub = new EventEmitter<any>();

    @ViewChild('testForm', { static: true })
    testForm!: NgForm;

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

    patientTests: any = []
    public ngOnInit(): void {
        this.patientTests = [{
            "booking_id": 1021,
            "testsArray": ["Lipid", "blood Test"]
        },
        {
            "booking_id": 1022,
            "testsArray": ["blood Test", "x-ray"]
        }]
    }
}
