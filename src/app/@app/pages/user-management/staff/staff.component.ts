import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  /* ************************************* Static Field ********************************************* */
  /* ************************************* Instance Field ******************************************** */

  /* ************************************* Constructors ******************************************** */
  constructor() { }

  /* ************************************* Public Methods ******************************************** */
  public ngOnInit(): void {
    this._init();
  }



  /* ************************************* Private Methods ******************************************** */
  private _init(): void {
  }
}

