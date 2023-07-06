import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {KeyValueStorageService} from './key-value-storage.service';
import {AuthHttpInterceptor} from './auth-http.interceptor';
import { GlobalEmitterService } from './global-emitter.service';


@NgModule({
  imports: [HttpClientModule],
  declarations: [],
  providers: [
    AuthHttpInterceptor,

    GlobalEmitterService,
    KeyValueStorageService,
  ],
  exports: []
})
export class SharedServiceModule {
}
