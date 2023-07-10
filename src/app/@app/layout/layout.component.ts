import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { NavigationDto } from 'src/app/@shared/dto/navigation.dto';
import { AuthService } from 'src/app/@shared/security/auth.service';
import { GlobalEmitterService } from 'src/app/@shared/service/global-emitter.service';

/**
 * AppComponent
 */
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  /* ************************************ Static Fields *********************************** */
  /* ************************************ Instance Fields ********************************* */
  public opened = true;
  public menus = [] as NavigationDto[]; // [] as Array<NavigationDto>;
  @ViewChild('sidenav', { static: true })
  sidenav!: MatSidenav;

  /* ************************************* Constructors ******************************************** */
  constructor(private router: Router,
    private globalEmitterService: GlobalEmitterService,
    private authService: AuthService) {
    this.globalEmitterService.getAclChangedEmitter().subscribe(() => {
      this._init();
    });
  }

  /* ************************************* Public Methods ******************************************** */
  ngOnInit() {
    this._init();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55
      this.opened = true;
    }
  }

  public isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }

  public logout() {
    this.authService.signOut();
    this.router.navigate(['/signin']);
  }

  /* ************************************* Private Methods ******************************************** */
  private _init(): void {
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
  }
}
