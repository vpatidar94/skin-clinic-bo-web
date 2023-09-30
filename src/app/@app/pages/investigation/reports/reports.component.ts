import { Component, OnInit } from '@angular/core';

export interface TestInterface {
    testName: string;
    resultValue: string;
    unit: string;
    referenceValue: string;
}
    

// newly added to show table
const cbcTestData: TestInterface[] = [
    {  testName: 'HAEMOGLOBIN', resultValue: '10.2', unit: 'gm%', referenceValue: '11 - 17', },
    {  testName: 'TOTAL WBC COUNT', resultValue: '4000', unit: '/cumm', referenceValue: '4000 - 100000', },
    {  testName: 'NEUTROPHILES', resultValue: '42', unit: '%', referenceValue: '40 - 75', },
    {  testName: 'LYMPHOCYTES', resultValue: '52', unit: '%', referenceValue: '20 - 50', },
]

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
})

export class ReportsComponent implements OnInit{

    cbcReportArray!: any;

    public ngOnInit(): void {
        this.cbcReportArray=cbcTestData;
    }
}