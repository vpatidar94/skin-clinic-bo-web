import { NgModule } from '@angular/core';
import { AuthApi } from './auth.api';
import { OrgApi } from './org.api';
import { UserApi } from './user.api';

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    AuthApi, OrgApi, UserApi
  ],
  exports: []
})
export class RemoteApiModule {
}
