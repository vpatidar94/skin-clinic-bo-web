import { Component, Input, OnInit, } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DepartmentVo, InvestigationGroupVo, ItemVo, ServiceTypeVo } from 'aayam-clinic-core';
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

    gender = [] as string[];

    @Input()
    item!: ItemVo;

    @Input()
    departmentList!: DepartmentVo[];

    @Input()
    serviceTypeList!: ServiceTypeVo[];

    groupStates: boolean[] = [];

    itemList!: ItemVo[]


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
        this.item.investigationParam?.params[index].criteriaList.splice(1, 1);
    }

    public addTestParameter(index: number) {
        this.item.investigationParam?.params[index].criteriaList.push({
            testName: '',
            ref: '',
            unit: ''
        })
    }

    public addNewGroupTest(index: number) {
        this.item.investigationParam?.params.push({
            name: '',
            criteriaList: [{
                testName: "",
                ref: "",
                unit: ""
            }],
            gender: [],
            ageGroup: '',
        } as InvestigationGroupVo);

    }

    public addParameters(index: number): void {
        this.groupStates[index] = !this.groupStates[index];
    }

    public isGroupOpen(index: number): boolean {
        return this.groupStates[index];
    }

    // newly added
    // multiple select
    public onGenderSelect(item: any) {
        this.item.investigationParam?.params[0].gender == this.selectedGender.map((it: any) => {
            return {
                key: it.item_id,
                name: it.item_text,
                value: ''
            } as any;
        });
    }


    /* ************************************* Private Methods ******************************************** */
    private _inIt(): void {
        this.genderSelectList = this.genderList?.map((item: any) => {
            const selected = { item_id: item.id, item_text: item.name };
            return selected;
        });
    }
}