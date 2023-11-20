import { Component, Input, OnInit, } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DepartmentVo, InvestigationCriteriaVo, OrgBookingDto, ProductVo } from 'aayam-clinic-core';
import { InvestigationParamVo } from 'aayam-clinic-core';
import { GENDER_LIST } from 'src/app/@app/const/gender.consr';

@Component({
    selector: 'app-investigation-edit',
    templateUrl: './investigation-edit.component.html',
    styleUrls: ['./investigation-edit.component.scss'],
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

    orgBooking!:  OrgBookingDto[]



    // newly added 
    genderSelectList: Array<any> = GENDER_LIST;
    selectedGender = [] as any[];
    dropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        itemsShowLimit: 3,
        allowSearchFilter: true,
        enableCheckAll: false,
        maxHeight: 50
    };

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
        this.investigationParameters.params.push({ name: '', criteriaList: [], geneder: [], ageGroup: ''})
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
        this.genderSelectList = this.genderList?.map((item: any) => {
                         const selected = { item_id: item.id, item_text: item.name};
                         return selected;
                   });

        if (!this.investigationParameters.params) {
            this.investigationParameters.params = [{ name: '', criteriaList: [], geneder: [], ageGroup: '' }]
        }
        
    }
    
    // newly added
    // multiple select
    onGenderSelect(item: any) {
        // this.investigationParameters.params[0].geneder = this.selectedGender.map((it: any) => {
        //     return {
        //         key: it.item_id,
        //         name: it.item_text,
        //         value: ''
        //     } as any;
        // });
    }

}