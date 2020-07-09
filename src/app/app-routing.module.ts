import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationModule} from './organization/organization.module';
import { ListComponent as OrgListComponent} from './organization/list/list.component';
import {ListComponent as CPListComponent} from './charge-point/list/list.component';
import {ChargePointModule} from './charge-point/charge-point.module';

const routes: Routes = [
  { path: 'organization', component: OrgListComponent },
  { path: 'charge_point', component: CPListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), OrganizationModule, ChargePointModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
