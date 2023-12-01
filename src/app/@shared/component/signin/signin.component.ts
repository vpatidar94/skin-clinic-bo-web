import { Component, OnInit } from '@angular/core';
import { AngularFireAuth, } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ApiResponse, JwtClaimDto, Message, MessageType, MessageValue, ResponseStatus, UserAccessDetailDto, UserAuthDto } from 'aayam-clinic-core';
import jwt_decode from 'jwt-decode';
import { GlobalEmitterService } from '../../service/global-emitter.service';
import { KeyValueStorageService } from '../../service/key-value-storage.service';
import { UserApi } from 'src/app/@app/service/remote/user.api';
import { AlertMessage } from '../../dto/alert-message';

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
    private userApi: UserApi,
    private router: Router) {
  }

  /* ************************************* Public Methods ******************************************** */
  public ngOnInit(): void {
    this._init();
  }

  public login(): void {
    this.userAuth.email = this.userAuth.email?.trim() + '@aayam.co.in'
    this.angularFireAuth.signInWithEmailAndPassword(this.userAuth.email, this.userAuth.password)
      .then((result) => {
        if (result.user) {
          result.user.getIdToken().then((token: string) => {
            this._getUserAllAccessList(token);
          });
        }
      })
      .catch((error) => {
        const message = {} as AlertMessage;
        message.type = MessageType[MessageType.ERROR];
        message.text = 'Invalid credentials';
        this.glabalEmitterService.addAlerMsg(message);
      });
  }


  /* ************************************* Private Methods ******************************************** */
  private _init(): void {
  }

  private _getUserAllAccessList(token: string): void {
    this.userApi.getUserAllAccessList().subscribe((res: ApiResponse<UserAccessDetailDto>) => {
      if (res.body) {
        this.keyValueStorageService.saveCurrentAccess(res.body.current);
        this.keyValueStorageService.saveAllAccess(res.body.all);
        if (res.body.current.org) {
          this.keyValueStorageService.saveOrg(res.body.current.org);
        }
        const userAccess = jwt_decode(token) as JwtClaimDto;
        this.keyValueStorageService.saveRole(userAccess?.userAccess?.role ?? '');
        this.keyValueStorageService.saveSubRole(userAccess?.userAccess?.subRole ?? '');
        this.keyValueStorageService.saveOrgId(userAccess?.userAccess?.orgId ?? '');

        this.router.navigate(['/dashboard']);
        this.glabalEmitterService.emitUserSignInEmitter('' + ResponseStatus[ResponseStatus.SUCCESS]);
        this.glabalEmitterService.emitAclChangedEmitter();
        const message = {} as AlertMessage;
        message.type = MessageType[MessageType.SUCCESS];
        message.text = 'Sign in Successfully';
        this.glabalEmitterService.addAlerMsg(message);
      }
    });
  }
}

