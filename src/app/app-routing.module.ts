import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './@app/layout/layout.component';
import { SigninComponent } from './@shared/component/signin/signin.component';
import { AuthGuard } from './@shared/security/auth.guard';

const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard], // CanActivate executes before Resolve

    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./@app/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./@app/pages/user-management/user-management.module').then(m => m.UserManagementModule)
      },
      {
        path: 'support',
        loadChildren: () => import('./@app/pages/support/support.module').then(m => m.SupportModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./@app/pages/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'appointment',
        loadChildren: () => import('./@app/pages/appointment/appointment.module').then(m => m.AppointmentModule)

      },
      {
        path: 'master',
        redirectTo: '/master/services',
        pathMatch: 'full'
      },
      
      {
        path: 'master',
        // component: MasterComponent,
        loadChildren: () => import('./@app/pages/master/master.module').then(m => m.MasterModule)

      },
      {
        path: 'users',
        redirectTo: '/users/user',
        pathMatch: 'full'
      },
      
      {
        path: 'users',
        loadChildren: () => import('./@app/pages/users/users.module').then(m => m.UsersModule)
    
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
