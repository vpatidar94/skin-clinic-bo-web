import { Component, OnInit } from '@angular/core';

export interface TestInterface {
    testName: string;
    resultValue: string;
    unit: string;
    referenceValue: string;
}

const cbcTestData: TestInterface[] = [
    { testName: 'HAEMOGLOBIN', resultValue: '10.2', unit: 'gm%', referenceValue: '11 - 17', },
    { testName: 'TOTAL WBC COUNT', resultValue: '4000', unit: '/cumm', referenceValue: '4000 - 100000', },
    { testName: 'NEUTROPHILES', resultValue: '42', unit: '%', referenceValue: '40 - 75', },
    { testName: 'LYMPHOCYTES', resultValue: '52', unit: '%', referenceValue: '20 - 50', },
]

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
})

export class ReportsComponent implements OnInit {

    cbcReportArray: TestInterface[] = cbcTestData;

    // Variables to track the state of checkboxes
    cbcReportChecked: boolean = false;
    widalTestChecked: boolean = false;
    lipidProfileChecked: boolean = false;

    public ngOnInit(): void {
        // this.cbcReportArray=cbcTestData;
    }

    printSelectedReports(reportName: string) {
        if (reportName === 'CBC' && this.cbcReportChecked) {
            window.print();
            //         // Print CBC report content
            //         console.log('Printing CBC report content:',this.cbcReportArray);
            //         // You can replace console.log with actual printing logic
            //         const reportToPrint = this.cbcReportArray[0];

            // const printWindow = window.open('', '', 'width=600,height=600');
            // if (printWindow) { // Check if printWindow is not null
            //   printWindow.document.open();
            //   printWindow.document.write('<html><head><title>Printed Report</title></head><body>');

            //   printWindow.document.write(
            // //     `
            // //     <h2>${reportToPrint.testName}</h2>
            // //     <p><strong>Result Value:</strong> ${reportToPrint.resultValue}</p>
            // //     <p><strong>Unit:</strong> ${reportToPrint.unit}</p>
            // //     <p><strong>Reference Value:</strong> ${reportToPrint.referenceValue}</p>
            // //   `
            // `<h2>${this.cbcReportArray}</h2>`
            //   );

            //   printWindow.document.write('</body></html>');
            //   printWindow.document.close();
            //   printWindow.print();
            //   printWindow.close();
            // } else {
            //   console.error('Failed to open print window.');
            // }
            //   } else {
            //     alert('No report selected for printing.');
            //   }
            // }
        }


        if (this.widalTestChecked) {
            // Print Widal Test report content
            console.log('Printing Widal Test report content:');
            // You can replace console.log with actual printing logic
        }

        if (this.lipidProfileChecked) {
            // Print Lipid Profile report content
            console.log('Printing Lipid Profile report content:');
            // You can replace console.log with actual printing logic
        }
    }
}