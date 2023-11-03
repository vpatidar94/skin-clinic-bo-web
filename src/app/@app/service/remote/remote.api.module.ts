import { NgModule } from '@angular/core';
import { AuthApi } from './auth.api';
import { OrgApi } from './org.api';
import { UserApi } from './user.api';
import { ServiceItemApi } from './service-item.api';
import { BookingApi } from './booking.api';
import { DepartmentApi } from './department.api';
import { ProductApi } from './product.api';
import { TransactionApi } from './transaction.api';
import { InvestigationApi } from './investigation.api';

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    AuthApi, OrgApi, UserApi, ServiceItemApi, BookingApi, DepartmentApi, ProductApi, TransactionApi,InvestigationApi
  ],
  exports: []
})
export class RemoteApiModule {
}
