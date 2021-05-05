import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from '../common/material.module';
import { InvoicesModule } from './../invoices/invoices.module';
import { ClientsModule } from './../clients/clients.module';

@NgModule({
  declarations: [DashboardComponent, SideNavComponent, NavbarComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    InvoicesModule,
    ClientsModule,
  ],
})
export class DashboardModule {}
