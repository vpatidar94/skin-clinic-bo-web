import { Component, OnInit } from '@angular/core';
import { UserProfileComponent } from './userprofile/userprofile.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {

  /* ************************************* Instance Field ******************************************** */
  showSectionUserProfile!: boolean;
  showSectionAccounts!: boolean;
  showSectionAttendance!: boolean;

  tabValue!: string;

  /* ************************************* Public Methods ******************************************** */
  public ngOnInit(): void {
    this._init();
  }

  public tabChange(): void {
    this._tabChange(this.tabValue);
  }
  /* ************************************* Private Methods ******************************************** */
  private _init(): void {
    this.tabValue = 'USERPROFILE'
    this.tabChange();
    
  }
  private _tabChange(tabValue: string): void {
    switch (tabValue) {
      case 'USERPROFILE':
        this._resetSection();
        this.showSectionUserProfile = true;
        break;
      case 'ACCOUNTS':
        this._resetSection();
        this.showSectionAccounts = true;
        break;
      case 'ATTENDANCE':
        this._resetSection();
        this.showSectionAttendance = true;
        break;
     
    }
  }

  private _resetSection(): void {
    this.showSectionUserProfile = false;
    this.showSectionAccounts = false;
    this.showSectionAttendance = false;
  }



}