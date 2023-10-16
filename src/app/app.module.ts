import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from "@angular/fire/compat";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { environment } from 'src/environments/environment';
import { LayoutModule } from './@app/layout/layout.module';
import { AlertMessageModule } from './@shared/component/alert-message/alert-message.module';
import { SigninModule } from './@shared/component/signin/signin.module';
import { SpinnerModule } from './@shared/component/spinner/spinner.module';
import { AuthGuard } from './@shared/security/auth.guard';
import { AuthService } from './@shared/security/auth.service';
import { AuthHttpInterceptor } from './@shared/service/auth-http.interceptor';
import { SharedServiceModule } from './@shared/service/shared-service.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReceiptModule } from './receipt/receipt.module';
import { PrescriptionPrintModule } from './prescription-print/prescription-print.module';
import { AppointmentModule } from './@app/pages/appointment/appointment.module';
import { ExcelFileUploadModule } from './@shared/component/excel-file-upload/excel-file-upload.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    ReceiptModule,
    PrescriptionPrintModule,
    HttpClientModule,
    SigninModule,
    ExcelFileUploadModule,
    SpinnerModule,
    AlertMessageModule,
    NgxWebstorageModule.forRoot(),
    SharedServiceModule,
    AppointmentModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    },
    AuthService, AuthGuard,
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'INR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
