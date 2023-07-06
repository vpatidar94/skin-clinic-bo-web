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
        path: 'booking',
        loadChildren: () => import('./@app/pages/booking/booking.module').then(m => m.BookingModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./@app/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
