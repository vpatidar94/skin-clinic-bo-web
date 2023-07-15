import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FnUtility, NavigationDto, ROLE } from 'aayam-clinic-core';
import { GlobalEmitterService } from 'src/app/@shared/service/global-emitter.service';
import { KeyValueStorageService } from '../../service/key-value-storage.service';
import { OrgUtility } from '../../utility/org.utility';

@Component({
    selector: 'app-eg-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {

    /* ************************************ Static Fields ************************************ */

    /* ************************************ Instance Fields ************************************ */
    public menus = [] as any[]; // [] as Array<NavigationDto>;
    private role?: string | null;
    private orgId?: string | null;
    private brId?: string | null;
    private subRole?: string | null;

    /* ************************************ Constructors ************************************ */
    constructor(private router: Router,
        private keyValueStorageService: KeyValueStorageService,
        private globalEmitterService: GlobalEmitterService) {
        this.router.events.subscribe((val: NavigationEnd | any) => {
            if (val instanceof NavigationEnd) {
                this._menuChange(val.urlAfterRedirects); // val.url or val.urlAfterRedirects
            }
        });

        this.globalEmitterService.getAclChangedEmitter().subscribe(() => {
            console.log('xx xxx xx xUser');
            this._init();
            const url = this.router.routerState.snapshot.url;
            this._menuChange(url);
        });

        this.globalEmitterService.getUserSignInEmitter().subscribe(() => {
            console.log('xx xxx xx xUser');
            this._init();
            const url = this.router.routerState.snapshot.url;
            this._menuChange(url);
        });
    }

    /* ************************************ Public Methods ************************************ */
    /*
      (click)='menuChange(menu)'
      (click)='menuChange(subMenu)'

      public menuChange(row) {
        this.menus.forEach(menu => {
          menu['open'] = false;
        });
        row.open = true;
      }
    */

    ngOnInit() {
        this._init()
    }

    /* ************************************ Private Methods ************************************ */
    private _init(): void {
        this.role = this.keyValueStorageService.getRole();
        this.orgId = this.keyValueStorageService.getOrgId();
        this.brId = this.keyValueStorageService.getOrgId();
        this.subRole = this.keyValueStorageService.getSubRole();
        this.menus = this._getNavigation();
    }

    private _menuChange(url: string): void {
        // reset
        const menuListRest = [] as any[];
        this.menus.forEach(menu => {
            menu.open = false;
            menuListRest.push(menu);
        });
        this.menus = menuListRest;
        const menuList = [] as any[];
        this.menus.forEach(menu => {
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
            menuList.push(menu);
        });
        this.menus = menuList;
    }

    private _getNavigation(): NavigationDto[] {
        // const superAdminAny = SecurityUtility.hasDdSupportAccess(this.role);

        // const noOrgAssociated = FnUtility.isEmpty(this.valueService.acl?.org);
        // const activeOrgSetupNotDone = this.valueService.acl?.org?.status === ORG_STATUS.IN_PROGRESS;
        // const showSetupOnly = (!superAdminAny && environment.region === 'US' && (noOrgAssociated || activeOrgSetupNotDone));

        const navList = [] as NavigationDto[];
        navList.push(new NavigationDto('Dashboard', '/dashboard', 'ic_graph1', []));
        this._getNavigationSuperAdmin(navList);
        this._getNavigationAdmin(navList);
        this._getNavigationEmp(navList);
        this._getNavigationCommon(navList);
        // if (showSetupOnly) {
        //     this._getNavigationSetup(navList);
        // } else {
        //     this._getNavigationConsumer(navList);
        //     this._getNavigationRide(navList);
        //     if (environment.region === 'IN') {
        //         this._getNavigationCareer(navList);
        //     }
        //     this._getNavigationPos(navList);
        //     this._getNavigationEdu(navList);
        //     this._getNavigationQr(navList);
        // }
        return navList;
    }

    private _getNavigationSuperAdmin(navList: NavigationDto[]): Array<NavigationDto> {
        if (OrgUtility.hasSuperAdminAccess(this.role)) {
            let sub: Array<NavigationDto>;
            sub = [];
            sub.push(new NavigationDto('Enterprise', '/support/org', 'ic_enterprise', []));
            sub.push(new NavigationDto('Network', '/support/org-network', 'ic_network', []));
            navList.push(new NavigationDto('Support', '/support/org', 'ic_headset', sub));

            if (OrgUtility.hasOrgAccess(this.orgId)) {
                sub = [];
                sub.push(new NavigationDto('Staff', '/user/staff', 'ic_user_circle', []));
                sub.push(new NavigationDto('Customer', '/user/customer', 'ic_users_m_f', []));
                navList.push(new NavigationDto('User Management', '/user/staff', 'ic_users_m_f', sub));
            }
        }
        return navList;
    }

    private _getNavigationAdmin(navList: NavigationDto[]): Array<NavigationDto> {
        if (OrgUtility.hasOrgAccess(this.orgId) && OrgUtility.hasAdminAccess(this.role)) {
            let sub: Array<NavigationDto>;
            sub = [];
            sub.push(new NavigationDto('Staff', '/user/staff', 'ic_user_circle', []));
            sub.push(new NavigationDto('Customer', '/user/customer', 'ic_users_m_f', []));
            navList.push(new NavigationDto('User Management', '/user/staff', 'ic_users_m_f', sub));
        }
        return navList;
    }

    private _getNavigationEmp(navList: NavigationDto[]): Array<NavigationDto> {
        if (OrgUtility.hasOrgAccess(this.orgId) && OrgUtility.hasEmpAccess(this.role)) {
            let sub: Array<NavigationDto>;
            // sub = [];
            // sub.push(new NavigationDto('Customer', '/user/customer', 'ic_users_m_f', []));
            // navList.push(new NavigationDto('User Management', '/user/customer', 'ic_users_m_f', sub));
        }
        return navList;
    }

    private _getNavigationCommon(navList: Array<NavigationDto>): Array<NavigationDto> {
        navList.push(new NavigationDto('Profile', '/profile', 'ic_user', []));
        return navList;
    }
}

