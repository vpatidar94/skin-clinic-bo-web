import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, take, tap } from 'rxjs/operators';

import { User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { auth } from '../firebase/firebase';
import { KeyValueStorageService } from '../service/key-value-storage.service';
import { JwtClaimDto } from 'aayam-clinic-core';
import jwt_decode from 'jwt-decode';

/*
 Note: rxjs/Rx removed from import-blacklist in tslint.json
 why import {Observable, Subject, BehaviorSubject} from 'rxjs/Rx';
 some other module also require else will get below error -
 authService.authInfo$.map is not a function

 import {Observable} from 'rxjs';
 import {Subject} from 'rxjs/Subject';
 import {BehaviorSubject} from 'rxjs/BehaviorSubject';
 +
 import 'rxjs/add/operator/map'; . . .
 */
@Injectable()
export class AuthService {

  private user?: User | any;
  private claim?: JwtClaimDto;
  /*
    static UNKNOWN_USER = new AuthInfo(null);

    authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);

  type Routes = Route[];

  Routes - Array of Route
  Router - Provides the navigation and url manipulation capabilities.
  */
  constructor(private router: Router,
    private angularFireAuth: AngularFireAuth,
    private keyValueStorageService: KeyValueStorageService) {
    this.angularFireAuth.authState.subscribe((user: User | any) => {
      if (user) {
        this.user = user;
        user.getIdToken().then((token: string) => { 
          this.claim = jwt_decode(token);
        });
      }
    });
  }

  // Returns true if user is logged in
  get authenticated() {
    return this.angularFireAuth.authState
      .pipe(map(user => (null !== user)))
      .pipe(take(1))
      .pipe(tap(allowed => {
        if (!allowed) {
          this.router.navigate(['/signin']);
        }
      }));
  }

  // Returns current user
  get currentUser(): User | null {
    // return this.authenticated ? this.user : null;
    return this.user;
  }

   get getClaim(): JwtClaimDto | null {
    // return this.authenticated ? this.user : null;
     return this.claim as JwtClaimDto;
  }

  // Returns current user UID
  get currentUserId(): string {
    // return this.authenticated ? (this.user?.uid ?? '') : '';
    return this.user?.uid ?? '';
  }

  getRole(): string { 
    return this.claim?.userAccess.role ?? '';
  }

  signOut(): void {
    // clear all the managed storage items
    // FIXME this.keyValueStorageService.clearAll();
    // FIXME this.keyValueSessionStorageService.clearAll();
    this.user = null;
    auth.signOut().then(r => { });
    this.keyValueStorageService.clearAll();
    console.log('successful sign-out');
  }

}
