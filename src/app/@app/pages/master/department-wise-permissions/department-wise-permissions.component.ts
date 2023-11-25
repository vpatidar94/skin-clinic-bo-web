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

    constructor(
    ) { }

    public ngOnInit(): void {
    }

    menuOptions: string[] = ['Add Patient', 'Appointment']; // Add other menu options as needed
    arrayMenus: { menu: string, pages: { name: string, selected: boolean }[] }[] = [
        { menu: '', pages: [] } // Initially, an empty menu
    ];

    addMenu(): void {
        this.arrayMenus.push({ menu: '', pages: [] });
    }

    removeMenu(index: number): void {
        this.arrayMenus.splice(index, 1);
    }

    selectMenu(section: any): void {
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

    addPage(section: any): void {
        const newPage = prompt('Enter the name of the new page:');
        if (newPage) {
            section.pages.push({ name: newPage, selected: false });
        }
    }

    removePage(section: any): void {
        const selectedPages = section.pages.filter((page: any) => page.selected); // Explicitly specify type for 'page'
        selectedPages.forEach((selectedPage: any) => {
            const index = section.pages.indexOf(selectedPage);
            if (index !== -1) {
                section.pages.splice(index, 1);
            }
        });
    }

}







