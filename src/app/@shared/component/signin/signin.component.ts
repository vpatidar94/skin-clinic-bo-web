import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthDto } from 'aayam-clinic-core';
import { AuthAPi } from 'src/app/@app/service/remote/auth.api';
import { KeyValueStorageService } from '../../service/key-value-storage.service';
import { AngularFireAuth, } from '@angular/fire/compat/auth';
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
  constructor(private authApi: AuthAPi,
    private keyValueStorageService: KeyValueStorageService,
    private angularFireAuth: AngularFireAuth,
    private router: Router) {
    // angularFireAuth.
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     this.keyValueStorageService.saveFbUser(JSON.stringify(user));
    //     // this.keyValueStorageService.saveFbUser();
    //   }
    // });

  }

  /* ************************************* Public Methods ******************************************** */
  public ngOnInit(): void {
    this._init();
  }

  public login(): void {
    this.angularFireAuth.signInWithEmailAndPassword(this.userAuth.email, this.userAuth.password).then((result) => {
      if (result.user) {
        // console.log('xxx xx xx navigate ');
        // this.keyValueStorageService.saveFbUser(JSON.stringify(result.user));
        this.router.navigate(['/dashboard']);
      }
    });
  }


  /* ************************************* Private Methods ******************************************** */
  private _init(): void {
  }
}

