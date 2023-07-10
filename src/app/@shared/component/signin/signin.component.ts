import { Component, OnInit } from '@angular/core';
import { AngularFireAuth, } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { JwtClaimDto, ResponseStatus, UserAuthDto } from 'aayam-clinic-core';
import jwt_decode from 'jwt-decode';
import { GlobalEmitterService } from '../../service/global-emitter.service';
import { KeyValueStorageService } from '../../service/key-value-storage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  /* ************************************* Static Field ********************************************* */
  /* ************************************* Instance Field ******************************************** */
  userAuth: UserAuthDto = {} as UserAuthDto;

  /* ************************************* Constructors ******************************************** */
  constructor(private keyValueStorageService: KeyValueStorageService,
    private angularFireAuth: AngularFireAuth,
    private glabalEmitterService: GlobalEmitterService,
    private router: Router) {
  }

  /* ************************************* Public Methods ******************************************** */
  public ngOnInit(): void {
    this._init();
  }

  public login(): void {
    this.angularFireAuth.signInWithEmailAndPassword(this.userAuth.email, this.userAuth.password).then((result) => {
      if (result.user) {
        result.user.getIdToken().then((token: string) => {
          const userAccess = jwt_decode(token) as JwtClaimDto;
          this.keyValueStorageService.saveRole(userAccess?.userAccess?.role ?? '');
          this.keyValueStorageService.saveSubRole(userAccess?.userAccess?.subRole ?? '');
          this.keyValueStorageService.saveOrgId(userAccess?.userAccess?.orgId ?? '');
          this.router.navigate(['/dashboard']);
          this.glabalEmitterService.emitUserSignInEmitter('' + ResponseStatus[ResponseStatus.SUCCESS]);
        });
      }
    });
  }


  /* ************************************* Private Methods ******************************************** */
  private _init(): void {
  }
}

