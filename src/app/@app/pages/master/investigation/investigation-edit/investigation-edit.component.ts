import { Component, Input, OnInit, } from '@angular/core';
import { ProductVo } from 'aayam-clinic-core';

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

    // groupTestData = [{
    //     testName: '',
    //     reference: '',
    //     unit: '',
    //     group:'',

    // }]

    buttonNumber!: Array<BtnInterface>; 

    testParameter!: Array<TestParameterInterface>

    // groupTestPara: Array<GroupTestInterface> = []

    /* ************************************* Constructors ******************************************** */
    constructor() { }

    /* ************************************* Public Methods ******************************************** */

    public ngOnInit(): void {
        this.testParameter = (this.testParameterData as Array<TestParameterInterface>);
        // this.groupTestPara = (this.groupTestData as Array<GroupTestInterface>);
        this.buttonNumber = [{btnNumb:''}] as Array<BtnInterface>;
    }

    public removeTestParameter(index: number): void {
        this.testParameter.splice(index, 1);
    }

    public addTestParameter() {
        this.testParameter.push({
            testName: "",
            reference: "",
            unit: "",
        });
    }

    public addNewGroupTest(){
        this.buttonNumber.push({btnNumb:''})
        // this.groupTestPara.push({
        //     testName: '',
        //     reference: '',
        //     unit: '',
        //     group:'',
        // })
    }

    /* ************************************* Private Methods ******************************************** */

}