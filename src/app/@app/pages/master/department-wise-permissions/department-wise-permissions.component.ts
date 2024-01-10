import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-department-wise-permissions',
    templateUrl: './department-wise-permissions.component.html',
    styleUrls: ['./department-wise-permissions.component.scss']
})

export class DepartmentWisePermissionsComponent implements OnInit {

     /* ********************************* Static Field *************************************** */
    /* *********************************** Instance Field *********************************** */
    arrayDept: {departmentName: string }[] = [{departmentName: ''}];
    
    departmentOptions: string[] = ['department1', 'department2'];

    menuOptions: string[] = ['Add Patient', 'Appointment']; // Add other menu options as needed
    arrayMenus: { menu: string, pages: { name: string, selected: boolean }[] }[] = [
        { menu: '', pages: [] } // Initially, an empty menu
    ];
    
    permissionList: string[]= ['Add Appointement','Show Appointment', 'Add Patient', 'Show Patient', 'Show Service','Edit Service', 'Show Billing','Edit Billing', 'Prescriptions', 'Observations','Investigations','Pharmcy Billing','Sample Collection', 'Admin Reports'];

    departmentOptionsList: string[] = ['Reception', 'OPD', 'Pharmacy', 'Pathology', 'Doctor', 'Pathology staff', 'Cleaning staff', 'Security staff','Accounts']

    showDepartmentOption: boolean = false;
    
    
    /* ************************************* Constructors ******************************************** */
    constructor(
    ) { }
   
   
    /* ************************************* Public Methods ******************************************** */
    public ngOnInit(): void {
    }
    // newly added all permisson list
    
    public addDept(): void {
        this.arrayDept.push({departmentName: ''})
    }

    public removeDept(index: number): void {
        this.arrayDept.splice(index,1)

    }

    public addMenu(): void {
        this.arrayMenus.push({ menu: '', pages: [] });
    }

    public removeMenu(index: number): void {
        this.arrayMenus.splice(index, 1);

    }

    public selectMenu(section: any): void {
        // Handle actions based on the selected menu if needed
        switch (section.menu) {
            case 'Add Patient':
                section.pages = [{ name: 'list', selected: false }, { name: 'add', selected: false }];
                break;
            case 'Appointment':
                section.pages = [{ name: 'list', selected: false }, { name: 'show', selected: false }];
                break;
            // Add cases for other menu options as needed
            default:
                section.pages = [];
        }
    }

    public selectDepartment(): void {
        this.showDepartmentOption = true;
    }

    public addPage(section: any): void {
        const newPage = prompt('Enter the name of the new page:');
        if (newPage) {
            section.pages.push({ name: newPage, selected: false });
        }
    }

    public removePage(section: any): void {
        const selectedPages = section.pages.filter((page: any) => page.selected); // Explicitly specify type for 'page'
        selectedPages.forEach((selectedPage: any) => {
            const index = section.pages.indexOf(selectedPage);
            if (index !== -1) {
                section.pages.splice(index, 1);
            }
        });
    }

    /* ************************************* Private Methods ******************************************** */


}







