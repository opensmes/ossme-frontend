import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";
import { Router } from "@angular/router";

import { InvoiceService } from "./../../services/invoice.service";
import { Invoice } from "../../models/invoice";
import { AddInvoiceComponent } from "../add-invoice/add-invoice.component";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-invoice-list",
  templateUrl: "./invoice-list.component.html",
  styleUrls: ["./invoice-list.component.scss"]
})
export class InvoiceListComponent implements OnInit {
  invoicesList: Invoice[] = [];
  invoicesTotal = 0;
  invoicesPerPage = 8;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  dataSource: Invoice[] = [];
  displayedColumns: string[] = [
    "item",
    "date",
    "due",
    "qty",
    "rate",
    "tax",
    "action"
  ];
  private authListenerSubs!: Subscription;
  private invoicesSub!: Subscription;

  constructor(
    private _invoiceServ: InvoiceService,
    private _route: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this._invoiceServ.getInvoices(this.invoicesPerPage, this.currentPage);
    this.invoicesSub = this._invoiceServ
      .getInvoiceListener()
      .subscribe(
        (invoiceData: { invoices: Invoice[]; invoiceCount: number }) => {
          this.invoicesTotal = invoiceData.invoiceCount;
          this.invoicesList = invoiceData.invoices; // Latest first
          this.dataSource = invoiceData.invoices;
        }
      );
  }
  addInvoice() {
    this.getAll();
    this._route.navigate(["dashboard", "invoices", "new"]);
  }

  onEdit(invoiceId: string) {
    this._route.navigate(["dashboard", "invoices", invoiceId]);
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.invoicesPerPage = pageData.pageSize;
    this._invoiceServ.getInvoices(this.invoicesPerPage, this.currentPage);
  }

  onDelete(invoiceId: string) {
    this._invoiceServ.deleteInvoice(invoiceId).subscribe(
      () => {
        this._invoiceServ.getInvoices(this.invoicesPerPage, this.currentPage);
        this._snackBar.open("Invoice deleted!", "Success", {
          duration: 2000
        });
      },
      (error) => {
        this._invoiceServ.errorHandler(error, "Invoice deletion failed!");
      },
      () => {}
    );
  }
}
