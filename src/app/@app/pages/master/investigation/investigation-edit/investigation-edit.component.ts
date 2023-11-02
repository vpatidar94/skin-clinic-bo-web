import { Component, Input, OnInit, } from '@angular/core';
import { InvestigationCriteriaVo, ProductVo } from 'aayam-clinic-core';
import { InvestigationParamVo } from 'aayam-clinic-core';
export interface TestParameterInterface {
    testName: string;
    reference: string;
    unit: string;
}


export interface GroupTestInterface {
    testName:string;
    reference:string;
    unit:string;
    group:string;

}

export interface BtnInterface {
    btnNumb:string;
}

@Component({
    selector: 'app-investigation-edit',
    templateUrl: './investigation-edit.component.html',
})
export class InvestigationEditComponent implements OnInit {
    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */
    testParameterData = [{
        testName: '',
        reference: '',
        unit: '',
    }];

    criteriParameterData = [{
        testName: '',
        ref: '',
        unit: '',
    }]

    // groupTestData = [{
    //     testName: '',
    //     reference: '',
    //     unit: '',
    //     group:'',

    // }]

    buttonNumber!: Array<BtnInterface>; 

    testParameter!: Array<TestParameterInterface>

    criteriaList!: Array<InvestigationCriteriaVo>;

    showPara: boolean = false;

    groupStates: boolean[] = [];

    // groupTestPara: Array<GroupTestInterface> = []
    @Input()
    investigationParameters!: InvestigationParamVo;

    /* ************************************* Constructors ******************************************** */
    constructor() { }

    /* ************************************* Public Methods ******************************************** */

    public ngOnInit(): void {
        this.testParameter = (this.testParameterData as Array<TestParameterInterface>);
        // this.groupTestPara = (this.groupTestData as Array<GroupTestInterface>);
        // this.criteriaList = (this.criteriParameterData as Array<InvestigationCriteriaVo>);
        
        this.buttonNumber = [{btnNumb:''}] as Array<BtnInterface>;
        this.investigationParameters.params = [{name: '', criteriaList: []}]
    }

    public removeTestParameter(index: number): void {
        this.investigationParameters.params[index].criteriaList.splice(index, 1);
    }

    public addTestParameter(index:number) {
        // this.testParameter.push({
        //     testName: "",
        //     reference: "",
        //     unit: "",
        // });

        this.investigationParameters.params[index].criteriaList.push({
            testName: '',
            ref: '',
            unit: ''
        })

        // this.criteriaList.push({
        //     testName: '',
        //     ref: '',
        //     unit: ''
        // })
    }

    public addNewGroupTest(index:number){
        // this.buttonNumber.push({btnNumb:''})
        this.investigationParameters.params.push({name: '', criteriaList: []})
        // this.investigationParameters.params[index].criteriaList.push({ testName: '',
        // ref: '',
        // unit: ''})
        // this.groupTestPara.push({
        //     testName: '',
        //     reference: '',
        //     unit: '',
        //     group:'',
        // })
    }

    public checkIt():void {
        console.log("XXXXXXXXX",this.investigationParameters);
    }

    public addIt(index:number):void{
        if(this.investigationParameters.params[index].criteriaList.length==0){
        this.investigationParameters.params[index].criteriaList.push({ testName: '',
        ref: '',
        unit: ''})}

        this.showPara=true;

        this.groupStates[index] = !this.groupStates[index];

    }

    public isGroupOpen(index: number): boolean {
        // Check if the group is open or closed
        return this.groupStates[index];
    }
    /* ************************************* Private Methods ******************************************** */

}