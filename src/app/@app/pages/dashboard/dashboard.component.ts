import { Component, OnInit } from '@angular/core';
import { AuthAPi } from '../../service/remote/auth.api';
import { UserAuthDto } from 'aayam-clinic-core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  /* ************************************* Static Field ********************************************* */
  /* ************************************* Instance Field ******************************************** */

  /* ************************************* Constructors ******************************************** */
  constructor(private authApi: AuthAPi) { }

  /* ************************************* Public Methods ******************************************** */
  public ngOnInit(): void {
    this._init();
  }



  /* ************************************* Private Methods ******************************************** */
  private _init(): void {
    // const auth = {
    //   email: 'super@test.com',
    //   password: 'test123'
    // } as UserAuthDto;
    // this.authApi.authenticate(auth).subscribe();
  }
}

