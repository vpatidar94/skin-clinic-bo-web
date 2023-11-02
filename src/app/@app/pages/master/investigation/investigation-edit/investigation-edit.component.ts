import { Component, Input, OnInit, } from '@angular/core';
import { InvestigationCriteriaVo, ProductVo } from 'aayam-clinic-core';
import { InvestigationParamVo } from 'aayam-clinic-core';

@Component({
    selector: 'app-investigation-edit',
    templateUrl: './investigation-edit.component.html',
})
export class InvestigationEditComponent implements OnInit {
    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */

    criteriParameterData = [{
        testName: '',
        ref: '',
        unit: '',
    }]

    criteriaList!: Array<InvestigationCriteriaVo>;

    groupStates: boolean[] = [];  /* it is to give groupname[index] as true or false as we want to make particular group as true or false*/

    @Input()
    investigationParameters!: InvestigationParamVo;

    /* ************************************* Constructors ******************************************** */
    constructor() { }

    /* ************************************* Public Methods ******************************************** */

    public ngOnInit(): void {
        this.investigationParameters.params = [{ name: '', criteriaList: [] }]
    }

    public removeTestParameter(index: number): void {
        this.investigationParameters.params[index].criteriaList.splice(index, 1);
    }

    public addTestParameter(index: number) {
        this.investigationParameters.params[index].criteriaList.push({
            testName: '',
            ref: '',
            unit: ''
        })
    }

    public addNewGroupTest(index: number) {
        this.investigationParameters.params.push({ name: '', criteriaList: [] })
    }

    // public checkIt():void {
    //     console.log("XXXXXXXXX",this.investigationParameters);
    // }

    public addParameters(index: number): void {
        if (this.investigationParameters.params[index].criteriaList.length == 0) {
            this.investigationParameters.params[index].criteriaList.push({
                testName: '',
                ref: '',
                unit: ''
            })
        }
        this.groupStates[index] = !this.groupStates[index];
    }

    public isGroupOpen(index: number): boolean {
        return this.groupStates[index];
    }
    /* ************************************* Private Methods ******************************************** */

}