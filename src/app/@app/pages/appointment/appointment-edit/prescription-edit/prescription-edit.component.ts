import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PrescriptionVo } from 'aayam-clinic-core';
import { UiActionDto } from 'src/app/@shared/dto/ui-action.dto';

@Component({
    selector: 'app-prescription-edit',
    templateUrl: './prescription-edit.component.html'
})
export class PrescriptionEditComponent implements OnInit {
    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */

    @Input()
    prescription!: Array<PrescriptionVo>;
    @Output()
    prescriptionChange = new EventEmitter<Array<PrescriptionVo>>();

    @Output()
    pubSub = new EventEmitter<any>();

    @ViewChild('prescriptionForm', { static: true })
    prescriptionForm!: NgForm;



    /* ************************************ Constructors ************************************ */
    constructor() {
    }

    /* ************************************ Public Methods ************************************ */
    public ngOnInit(): void {
        this._init();
        // @ts-ignore
        this.prescriptionForm.valueChanges.subscribe(() => {
            this._formChanged();
        });
    }

    public addPrescription(): void {
        this.prescription.push({} as PrescriptionVo);
    }

    public removePrescription(index: number): void {
        this.prescription.splice(index, 1);
    }

    // public trackByIndex(index: number, obj: any): any {
    //     return index;
    // }


    /* ************************************ Private Methods ************************************ */
    private _init(): void {
    }

    private _formChanged(): void {
        const actionDto = {
            action: 'CHANGE_FORM_PRESCRIPTION',
            data: this.prescriptionForm.invalid
        } as UiActionDto<boolean>;
        this.pubSub.emit(actionDto);
    }
}
