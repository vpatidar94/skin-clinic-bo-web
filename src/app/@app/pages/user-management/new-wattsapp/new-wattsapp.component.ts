import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
    selector: 'app-new-wattsapp',
    templateUrl: './new-wattsapp.component.html',
})
export class NewWattsappComponent {
    templates = [{

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
                }
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
        "to": "917898118503",
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
    }
    ]

    newTemplateCode: string = '';
    addNewTemplate: boolean = false;

    selectedTemplateName: string = '';
    selectedTemplate: any;

    constructor(private httpClient: HttpClient) { }

    addTemplate() {
        try {
            // Parse the input as JSON and add it to the templates array
            const newTemplate = JSON.parse(this.newTemplateCode);
            this.templates.push(newTemplate);

            // Clear the form field after adding the template
            this.newTemplateCode = '';
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
        this.addNewTemplate = !this.addNewTemplate;

    }

    templateSelected() {
        this.selectedTemplate = this.templates.find(item => item.template.name === this.selectedTemplateName);

    }

    sendApiRequest() {
        if (!this.selectedTemplate) {
            console.error('No template selected.');
            return;
        }

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'API-KEY': '64d5cb1339dd4d8c4019d1d0'
        });

        // const requestBody = [this.selectedTemplate];
        const requestBody = this.selectedTemplate;

        console.log('Request Body:', requestBody); // Log the requestBody for debugging

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

    public addingNewTemplate(): void {
        this.addNewTemplate = !this.addNewTemplate;
    }
}



