import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './@app/layout/layout.component';
import { SigninComponent } from './@shared/component/signin/signin.component';
import { AuthGuard } from './@shared/security/auth.guard';
import { UsersComponent } from './@app/pages/users/users.component';

const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'users',
    component: UsersComponent,
  
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
        path: 'user',
        loadChildren: () => import('./@app/pages/user-management/user-management.module').then(m => m.UserManagementModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./@app/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
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
        
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
