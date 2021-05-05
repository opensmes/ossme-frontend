import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { InvoiceListComponent } from './../invoices/invoice-list/invoice-list.component';
import { ClientListComponent } from '../clients/client-list/client-list.component';
import { AddInvoiceComponent } from '../invoices/add-invoice/add-invoice.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'invoices',
        component: InvoiceListComponent,
      },
      {
        path: 'invoices/new',
        component: AddInvoiceComponent,
      },
      {
        path: 'invoices/:id',
        component: AddInvoiceComponent,
      },
      {
        path: 'clients',
        component: ClientListComponent,
      },
      {
        path: '**',
        redirectTo: 'invoices',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
