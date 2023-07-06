import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, take, tap } from 'rxjs/operators';

import { User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { auth } from '../firebase/firebase';
import { KeyValueStorageService } from '../service/key-value-storage.service';

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
    // this.user = JSON.parse(this.keyValueStorageService.getFbUser() ?? '');
    // onAuthStateChanged(auth, (user) => {
    //   console.log('xxx xx  xx called auth service ');
    //   if (user) {
    //     this.user = user;
    //   }
    // });
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
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

  // Returns current user UID
  get currentUserId(): string {
    // return this.authenticated ? (this.user?.uid ?? '') : '';
    return this.user?.uid ?? '';
  }

  signOut(): void {
    // clear all the managed storage items
    // FIXME this.keyValueStorageService.clearAll();
    // FIXME this.keyValueSessionStorageService.clearAll();
    this.user = null;
    auth.signOut().then(r => { });
    console.log('successful sign-out');
  }

}
