import { Component, OnInit, ViewChild, } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
    selector: 'app-wattsapp',
    templateUrl: './wattsapp.component.html',
    // styleUrls: ['./staff.component.scss']
})
export class WattsappComponent implements OnInit {
    //    ...................
    selectedTemplate: any; // To store the selected template
    inputArray: any[] = [];
    //   .................


    showMessage = false;
    message!: any;
    parameterLength!: any;
    parameterArray = [] as any[];

    newParameters = [] as any[];

    newCompleteArray = [] as any[];

    parameters = [
        {
            "type": "text",
            "text": "VARIABLE_TEXT"
        },
        {
            "type": "text",
            "text": "VARIABLE_TEXT"
        },
        {
            "type": "text",
            "text": "VARIABLE_TEXT"
        },
        {
            "type": "text",
            "text": "VARIABLE_TEXT"
        },
        {
            "type": "text",
            "text": "VARIABLE_TEXT"
        },
        {
            "type": "text",
            "text": "VARIABLE_TEXT"
        },
        {
            "type": "text",
            "text": "VARIABLE_TEXT"
        },
        {
            "type": "text",
            "text": "VARIABLE_TEXT"
        }
    ] as any[];

    newParameter = {
        "to": "RECEIVER",
        "recipient_type": "individual",
        "type": "template",
        "template": {
            "language": {
                "policy": "deterministic",
                "code": "en"
            },
            "name": "student_test_marks",
            "components": [
                {
                    "type": "body",
                    "parameters": [
                        {
                            "type": "text",
                            "text": "VARIABLE_TEXT"
                        },
                        {
                            "type": "text",
                            "text": "VARIABLE_TEXT"
                        },
                        {
                            "type": "text",
                            "text": "VARIABLE_TEXT"
                        },
                        {
                            "type": "text",
                            "text": "VARIABLE_TEXT"
                        },
                        {
                            "type": "text",
                            "text": "VARIABLE_TEXT"
                        },
                        {
                            "type": "text",
                            "text": "VARIABLE_TEXT"
                        },
                        {
                            "type": "text",
                            "text": "VARIABLE_TEXT"
                        },
                        {
                            "type": "text",
                            "text": "VARIABLE_TEXT"
                        }
                    ]
                },
                {
                    "type": "button",
                    "sub_type": "url",
                    "index": 0,
                    "parameters": [
                        {
                            "type": "text",
                            "text": "VARIABLE_TEXT"
                        }
                    ]
                }
            ]
        }
    }

    completeArray = [{

        "to": "917898118503",
        "recipient_type": "individual",
        "type": "template",
        "template": {
            "language": {
                "policy": "deterministic",
                "code": "en"
            },
            "name": "student_test_marks",
            "components": [
                {
                    "type": "body",
                    "parameters": this.parameterArray.map(param => {
                        return {
                            "type": "text",
                            "text": param.value
                        };
                    })
                }
                //  "parameters": [
                //     {
                //         "type": "text",
                //         "text": "VARIABLE_TEXT"
                //     },
                //     {
                //         "type": "text",
                //         "text": "VARIABLE_TEXT"
                //     },
                //     {
                //         "type": "text",
                //         "text": "VARIABLE_TEXT"
                //     },
                //     {
                //         "type": "text",
                //         "text": "VARIABLE_TEXT"
                //     },
                //     {
                //         "type": "text",
                //         "text": "VARIABLE_TEXT"
                //     },
                //     {
                //         "type": "text",
                //         "text": "VARIABLE_TEXT"
                //     },
                //     {
                //         "type": "text",
                //         "text": "VARIABLE_TEXT"
                //     },
                //     {
                //         "type": "text",
                //         "text": "VARIABLE_TEXT"
                //     }
                // ]
                // },
                // {
                //     "type": "button",
                //     "sub_type": "url",
                //     "index": 0,
                //     "parameters": [
                //         {
                //             "type": "text",
                //             "text": "VARIABLE_TEXT"
                //         }
                //     ]
                // }
            ]
        }
    },

    {
        "to": "RECEIVER",
        "recipient_type": "individual",
        "type": "template",
        "template": {
            "language": {
                "policy": "deterministic",
                "code": "hi"
            },
            "name": "test_absent_message",
            "components": [
                {
                    "type": "body",
                    "parameters": [
                        {
                            "type": "text",
                            "text": "VARIABLE_TEXT"
                        }
                    ]
                }
            ]
        }
    }];

    constructor(private httpClient: HttpClient) { }


    public ngOnInit(): void {
        // this.parameterArray = this.parameters;
        // console.log("...<<<.>>>",this.parameterArray);
        this.parameterArray = this.parameters.map((param, index) => ({
            ...param,
            value: '',
            index: index + 1
        }));

        this.newParameters = this.newParameter.template.components
        console.log("tttt", this.newParameters);

        this.newCompleteArray = this.completeArray;
        console.log("new xxxx", this.newCompleteArray);


    }

    generateMessage() {
        const messageTemplate = "Dear {{1}} you got {{2}}/{{3}} ({{4}}) marks in {{5}} of {{6}} Attempts in {{7}} (corr./incorr) are {{8}} respectively. Reg. AAYAM";
        const inputValues = this.parameterArray.map(param => param.value);

        const finalMessage = messageTemplate.replace(/\{\{\d+\}\}/g, () => inputValues.shift() || '');
        console.log(finalMessage);
        this.message = finalMessage;
        this.showMessage = !this.showMessage;
    }

    filterTemplateByName(): void {

    }

    // templateSelected() {
    //     this.parameterArray = this.selectedTemplate.template.components[0].parameters.map((param: any) => ({
    //         ...param,
    //         value: ''
    //     }));
    // }

    // templateSelected() {
    //     this.inputArray = this.selectedTemplate.template.components[0].parameters.map(() => ({
    //       value: ''
    //     }));
    //   }
    templateSelected() {
        if (this.selectedTemplate.template.components[0]?.parameters) {
            this.inputArray = this.selectedTemplate.template.components[0].parameters.map((param: any) => ({
                value: param.text
            }));
        } else {
            this.inputArray = [];
        }
    }

    public sendApiRequest() {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer yourAuthTokenHere'
            'API-KEY': '64d5cb1339dd4d8c4019d1d0'

        });

        const requestBody = {

            "to": "917898118503",
            "recipient_type": "individual",
            "type": "template",
            "template": {
                "language": {
                    "policy": "deterministic",
                    "code": "en"
                },
                "name": "student_test_marks",
                "components": [
                    {
                        "type": "body",
                        "parameters": this.parameterArray.map(param => {
                            return {
                                "type": "text",
                                "text": param.value
                            };
                        })
                    }
                    //  "parameters": [
                    //     {
                    //         "type": "text",
                    //         "text": "VARIABLE_TEXT"
                    //     },
                    //     {
                    //         "type": "text",
                    //         "text": "VARIABLE_TEXT"
                    //     },
                    //     {
                    //         "type": "text",
                    //         "text": "VARIABLE_TEXT"
                    //     },
                    //     {
                    //         "type": "text",
                    //         "text": "VARIABLE_TEXT"
                    //     },
                    //     {
                    //         "type": "text",
                    //         "text": "VARIABLE_TEXT"
                    //     },
                    //     {
                    //         "type": "text",
                    //         "text": "VARIABLE_TEXT"
                    //     },
                    //     {
                    //         "type": "text",
                    //         "text": "VARIABLE_TEXT"
                    //     },
                    //     {
                    //         "type": "text",
                    //         "text": "VARIABLE_TEXT"
                    //     }
                    // ]
                    // },
                    // {
                    //     "type": "button",
                    //     "sub_type": "url",
                    //     "index": 0,
                    //     "parameters": [
                    //         {
                    //             "type": "text",
                    //             "text": "VARIABLE_TEXT"
                    //         }
                    //     ]
                    // }
                ]
            }
        }
        
    


        const apiUrl = 'https://av2.wa0.in/cloud/messages';

            this.httpClient.post(apiUrl, requestBody, { headers }).subscribe(
                (response) => {
                    // Handle successful response
                    console.log('Response:', response);
                },
                (error) => {
                    // Handle error
                    console.error('Error:', error);
                }
            );

        }
    }

