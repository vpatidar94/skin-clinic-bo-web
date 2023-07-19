import { Component, OnInit } from '@angular/core';
import { UserAuthDto } from 'aayam-clinic-core';
import { AuthService } from 'src/app/@shared/security/auth.service';
import { AuthApi } from '../../service/remote/auth.api';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

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
  }
}

