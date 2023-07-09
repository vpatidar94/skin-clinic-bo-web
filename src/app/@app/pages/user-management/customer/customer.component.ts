import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

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

