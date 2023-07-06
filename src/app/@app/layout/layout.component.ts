import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { NavigationDto } from 'src/app/@shared/dto/navigation.dto';
import { AuthService } from 'src/app/@shared/security/auth.service';

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
    private authService: AuthService) {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this._menuChange(val.urlAfterRedirects); // val.url or val.urlAfterRedirects
      }
    });
  }

  /* ************************************* Public Methods ******************************************** */
  ngOnInit() {
    this._init();
    this.menus = this._getNavigation();
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
  private _getNavigation(): Array<NavigationDto> {
    const navList = [] as NavigationDto[];
    let sub: Array<NavigationDto>;
    sub = [];
    sub.push(new NavigationDto('Hospitals/Clinics', '/tx-history', 'receipt_long', null));
    navList.push(new NavigationDto('Hospitals/Clinics', '/tx-history', 'receipt_long', sub));
    return navList;
  }

  private _init(): void {
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
  }

  private _menuChange(url: string): void {
    // reset
    this.menus.forEach((menu: any) => {
      menu.open = false;
    });

    this.menus.forEach((menu: any) => {
      if (menu.nav && menu.nav.length > 0) {
        menu.nav.forEach((m: any) => {
          if (m.link === url) {
            menu.open = true;
          }
        });
      } else {
        if (menu.link === url) {
          menu.open = true;
        }
      }
    });
  }
}
