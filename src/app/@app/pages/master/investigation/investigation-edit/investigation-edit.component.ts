import { Component, Input, OnInit, } from '@angular/core';
import { ProductVo } from 'aayam-clinic-core';

export interface TestParameterInterface {
    testName: string;
    reference: string;
    unit:string;
    
  }

@Component({
    selector: 'app-investigation-edit',
    templateUrl: './investigation-edit.component.html',
})
export class InvestigationEditComponent implements OnInit{
    /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */
    
    /* ************************************* Constructors ******************************************** */
    constructor() { }

    testParameterData = [{
        testName: '',
        reference: '',
        unit:'',
      }];
 
    testParameter!:Array<TestParameterInterface>
    
    /* ************************************* Public Methods ******************************************** */
   
    /* ************************************* Private Methods ******************************************** */
public ngOnInit(): void {
 this.testParameter= (this.testParameterData as Array<TestParameterInterface>);
}

    public removeTestParameter(index: number): void {
        this.testParameter.splice(index, 1);
    }

    public addTestParameter() {
        this.testParameter.push({
            testName: "",
            reference: "",
            unit:"",
        });
    }

}