import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './@app/layout/layout.module';
import { AlertMessageModule } from './@shared/component/alert-message/alert-message.module';
import { SigninModule } from './@shared/component/signin/signin.module';
import { SpinnerModule } from './@shared/component/spinner/spinner.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthHttpInterceptor } from './@shared/service/auth-http.interceptor';
import { SharedServiceModule } from './@shared/service/shared-service.module';
import { AuthService } from './@shared/security/auth.service';
import { AuthGuard } from './@shared/security/auth.guard';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from 'src/environments/environment';
import { SvgUtility } from './@shared/utility/svg.utility';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    SigninModule,
    SpinnerModule,
    AlertMessageModule,
    NgxWebstorageModule.forRoot(),
    SharedServiceModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    },
    AuthService, AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
