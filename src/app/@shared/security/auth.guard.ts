import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // This is not working if user sign-in and hit secure url from browser directly
    console.log(this.authService.authenticated);
    // this.authService.authenticated.subscribe((loggedIn: boolean) => {
    //   return loggedIn;
    // });
    // if (this.authService.authenticated) {
    //   return true;
    // }
    // console.log('Access denied');
    // return false;
    return this.authService.authenticated;
  }

}
