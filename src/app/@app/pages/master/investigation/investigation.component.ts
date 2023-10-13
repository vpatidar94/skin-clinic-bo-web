import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  testCode: string;
  testName: string;
  department: any;
  specimenType: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { testCode: "001", testName: 'CBC', department: 'Pathology', specimenType: 'Blood', },
  { testCode: "002", testName: 'USG - Whole Abdomen', department: 'USG', specimenType: '-', },
  { testCode: "003", testName: 'MRI-Brain', department: 'MRI', specimenType: '-', },

]

@Component({
  selector: 'app-investigation',
  styleUrls: ['./investigation.component.scss'],
  templateUrl: './investigation.component.html',
})

export class InvestigationComponent implements AfterViewInit, OnInit {

  /* ************************************* Static Field ********************************************* */
  /* ************************************* Instance Field ******************************************** */
  showSectionInvestigationList!: boolean;
  showSectionInvestigationEdit!: boolean;

  displayedColumns: string[] = ['testCode', 'testName', "department", 'specimenType', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  /* ************************************* Constructors ******************************************** */
  constructor() { }

  /* ************************************* Public Methods ******************************************** */

  public ngAfterViewInit() {
    this.paginator.showFirstLastButtons = false;
    this.paginator.hidePageSize = false;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public addInvestigation(): void {
    this._addEditServiceItem();
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public ngOnInit(): void {
    this._init();
  }

  public cancel(): void {
    this._init();
  }


  /* ************************************* Private Methods ******************************************** */
  private _init(): void {
    this._resetSection();
    this.showSectionInvestigationList = true;
  }

  private _resetSection(): void {
    this.showSectionInvestigationList = false;
    this.showSectionInvestigationEdit = false;
  }

  private _addEditServiceItem(): void {
    this._resetSection();
    this.showSectionInvestigationEdit = true;
  }

}


