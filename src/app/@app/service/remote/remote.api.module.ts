import { NgModule } from '@angular/core';
import { AuthApi } from './auth.api';
import { OrgApi } from './org.api';

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    AuthApi, OrgApi
  ],
  exports: []
})
export class RemoteApiModule {
}
