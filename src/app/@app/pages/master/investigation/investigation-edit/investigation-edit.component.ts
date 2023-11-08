import { Component, Input, OnInit, } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DepartmentVo, InvestigationCriteriaVo, ProductVo } from 'aayam-clinic-core';
import { InvestigationParamVo } from 'aayam-clinic-core';
import { GENDER_LIST } from 'src/app/@app/const/gender.consr';

@Component({
    selector: 'app-investigation-edit',
    templateUrl: './investigation-edit.component.html',
})
export class InvestigationEditComponent implements OnInit {
    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */

   
genderList = GENDER_LIST;
gender = new FormControl('');
    criteriParameterData = [{
        testName: '',
        ref: '',
        unit: '',
    }]

    criteriaList!: Array<InvestigationCriteriaVo>;

    groupStates: boolean[] = [];  /* it is to give groupname[index] as true or false as we want to make particular group as true or false*/

    @Input()
    investigationParameters!: InvestigationParamVo;

    @Input()
    departmentList!: DepartmentVo[];

    /* ************************************* Constructors ******************************************** */
    constructor() { }

    /* ************************************* Public Methods ******************************************** */

    public ngOnInit(): void {
        this._inIt()
    }


    public removeTestParameter(index: number): void {
        this.investigationParameters.params[index].criteriaList.splice(1, 1);
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
    private _inIt(): void {
        if (!this.investigationParameters.params) {
            this.investigationParameters.params = [{ name: '', criteriaList: [] }]
            // this.investigationParameters.params=this.investigationParameters.params;
        }
        // else{
        // this.investigationParameters.params = [{ name: '', criteriaList: [] }]
        //  }
    }

}