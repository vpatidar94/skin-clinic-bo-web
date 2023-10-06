import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './@app/layout/layout.component';
import { SigninComponent } from './@shared/component/signin/signin.component';
import { AuthGuard } from './@shared/security/auth.guard';
import { ReceiptComponent } from './receipt/receipt.component';
import { PharmacyReceiptComponent } from './pharmacy-receipt/pharmacy-receipt.component';
import { ExcelFileUpload } from './@shared/component/excel-file-upload/excel-file-upload.component';


const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'excel-file-upload',
    component: ExcelFileUpload
  },

  {
    path: 'receipt',
    component: ReceiptComponent
  },
  {
    path: 'pharmacy-receipt',
    component: PharmacyReceiptComponent
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
      // {
      //   path: 'user',
      //   loadChildren: () => import('./@app/pages/user-management/user-management.module').then(m => m.UserManagementModule)
      // },
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
        loadChildren: () => import('./@app/pages/patient/patient.module').then(m => m.PatientModule)

      },
      {
        path: 'master',
        loadChildren: () => import('./@app/pages/master/master.module').then(m => m.MasterModule)
      },
      {
        path: 'manage-user',
        loadChildren: () => import('./@app/pages/users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'pharmacy',
        loadChildren: () => import('./@app/pages/pharmacy/pharmacy.module').then(m => m.PharmacyModule)
      },
      {
        path: 'new-appointment',
        loadChildren: () => import('./@app/pages/new-appointment/new-appointment.module').then(m => m.NewAppointmentModule)

      },
      {
        path: 'investigation',
        loadChildren: () => import('./@app/pages/investigation/investigation.module').then(m => m.InvestigationModule)
      },

      {
        path: 'inventory',
        loadChildren: () => import('./@app/pages/inventory/inventory.module').then(m => m.InventoryModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
