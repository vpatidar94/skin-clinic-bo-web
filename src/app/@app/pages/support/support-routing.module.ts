import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrgComponent } from './org/org.component';
import { OrgNetworkComponent } from './org-network/org-network.component';

const routes = [
  { path: '', component: OrgComponent },
  { path: 'org', component: OrgComponent },
  { path: 'org-network', component: OrgNetworkComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule {
}
