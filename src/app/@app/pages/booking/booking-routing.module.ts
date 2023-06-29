import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { TxHistoryComponent } from './tx-history/tx-history.component';

const routes = [
  { path: '', component: TxHistoryComponent },
  { path: 'tx-history', component: TxHistoryComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule {
}
