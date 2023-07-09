import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

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

