import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserVo } from 'aayam-clinic-core';
import { AuthService } from 'src/app/@shared/security/auth.service';
import { GlobalEmitterService } from 'src/app/@shared/service/global-emitter.service';

@Component({
  selector: 'app-eg-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  /* ************************************ Static Fields ************************************ */
  /* ************************************ Instance Fields ************************************ */
  user!: UserVo;
  thumbnail!: string;

  /* ************************************ Constructors ************************************ */
  constructor(private router: Router,
    private authService: AuthService,
    private globalEmitterService: GlobalEmitterService) {
    this.globalEmitterService.getUserSignInEmitter().subscribe(() => {
      this._init();
    });
  }


  /* ************************************ Public Methods ************************************ */
  ngOnInit(): void {
    this._init();
  }

  public routerTo(link: string): void {
    this.router.navigate([link]);
  }

  public signOut(): void {
    this.authService.signOut();
  }


  /* ************************************ Private Methods ************************************ */
  private _init(): void {
    this.user = ({} as UserVo);
    if (!this.user) {
      this.user = ({} as UserVo);
    }
  }
}
