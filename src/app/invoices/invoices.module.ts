import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { InvoiceListComponent } from "./invoice-list/invoice-list.component";
import { MaterialModule } from "./../common/material.module";
import { AddInvoiceComponent } from "./add-invoice/add-invoice.component";

@NgModule({
  declarations: [InvoiceListComponent, AddInvoiceComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [InvoiceListComponent]
})
export class InvoicesModule {}
