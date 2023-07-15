import { Component, OnInit } from '@angular/core';
import { UserAuthDto } from 'aayam-clinic-core';
import { AuthService } from 'src/app/@shared/security/auth.service';
import { AuthApi } from '../../service/remote/auth.api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  /* ************************************* Static Field ********************************************* */
  /* ************************************* Instance Field ******************************************** */

  /* ************************************* Constructors ******************************************** */
  constructor(private authApi: AuthApi,
  private authService: AuthService) { }

  /* ************************************* Public Methods ******************************************** */
  public ngOnInit(): void {
    this._init();
  }



  /* ************************************* Private Methods ******************************************** */
  private _init(): void {
    // console.log('xx xx xx this ', this.authService.currentUserAccess);
    const auth = {
      email: 'rach@test.com',
      password: '8989529107'
    } as UserAuthDto;
    // this.authApi.authenticate(auth).subscribe();
  }
}

