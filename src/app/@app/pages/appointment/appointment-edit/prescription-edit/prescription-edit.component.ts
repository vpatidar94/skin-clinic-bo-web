import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PrescriptionVo } from 'aayam-clinic-core';
import { UiActionDto } from 'src/app/@shared/dto/ui-action.dto';

@Component({
    selector: 'app-prescription-edit',
    templateUrl: './prescription-edit.component.html',
    styleUrls: ['./prescription-edit.component.scss']
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


    // newly added  for complaint section
    complaintsCount = 1;
    complaints: any[] = [{ count: 1 }];

    //newly added for diagnosis section
    diagnosisCount=1;
    diagnosis: any[] = [{ count:1 }];

    // newly added for Rx section
    RxCount=1;
    Rx: any[] = [{ count:1 }];


    /* ************************************ Constructors ************************************ */
    constructor() {
    }

    /* ************************************ Public Methods ************************************ */
    public ngOnInit(): void {
        this._init();
        // @ts-ignore
        this.prescriptionForm?.valueChanges?.subscribe(() => {
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



    // newly added for compllaints section
    addComplaints() {
        this.complaintsCount++;
        this.complaints.push({ count: this.complaintsCount });
      }
    
      removeComplaints() {
        if (this.complaints.length > 1) {
          this.complaints.pop();
        }
      }

    // newly added for diagnosis section
    addDiagnosis() {
        this.diagnosisCount++;
        this.diagnosis.push({ count: this.diagnosisCount });
      }
    
      removeDiagnosis() {
        if (this.diagnosis.length > 1) {
          this.diagnosis.pop();
        }
      }

      //newly added for Rx section
      addRx() {
        this.RxCount++;
        this.Rx.push({ count: this.RxCount });
      }
    
      removeRx() {
        if (this.Rx.length > 1) {
          this.Rx.pop();
        }
      }

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
