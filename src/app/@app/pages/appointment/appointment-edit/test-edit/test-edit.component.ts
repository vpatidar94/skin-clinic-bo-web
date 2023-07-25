import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ObservationVo } from 'aayam-clinic-core';
import { UiActionDto } from 'src/app/@shared/dto/ui-action.dto';

@Component({
    selector: 'app-test-edit',
    templateUrl: './test-edit.component.html'
})
export class TestEditComponent implements OnInit {
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



    /* ************************************ Constructors ************************************ */
    constructor() {
    }

    /* ************************************ Public Methods ************************************ */
    public ngOnInit(): void {
        this._init();
        // @ts-ignore
        this.testForm.valueChanges.subscribe(() => {
            this._formChanged();
        });
    }

    public addTestSuggestion(): void {
        this.test.push("");
    }

    public removeTestSuggestion(index: number): void {
        this.test.splice(index, 1);
        console.log("index", index);
    }

    public trackByIndex(index: number, obj: any): any {
        return index;
    }


    /* ************************************ Private Methods ************************************ */
    private _init(): void {
    }

    private _formChanged(): void {
        const actionDto = {
            action: 'CHANGE_FORM_TEST',
            data: this.testForm.invalid
        } as UiActionDto<boolean>;
        this.pubSub.emit(actionDto);
    }
}
