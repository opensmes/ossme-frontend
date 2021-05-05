import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";

import { environment } from "src/environments/environment";
import { Invoice } from "./../models/invoice";

@Injectable({
  providedIn: "root"
})
export class InvoiceService {
  private _url = environment.apiUrl + "/invoices";

  private invoices: Invoice[] = [];
  private invoicesUpdated = new Subject<{
    invoices: Invoice[];
    invoiceCount: number;
  }>();

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {}

  getInvoices(invoicesPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${invoicesPerPage}&page=${currentPage}`;
    this._http
      .get<{ message: string; invoices: any; totalInvoices: number }>(
        this._url + queryParams
      )
      .pipe(
        map((invoiceData) => {
          return {
            invoices: invoiceData.invoices
              .map((invoice: any) => {
                return {
                  id: invoice._id,
                  item: invoice.item,
                  qty: invoice.qty,
                  date: invoice.date,
                  due: invoice.due,
                  tax: invoice.tax,
                  rate: invoice.rate
                };
              })
              .reverse(),
            totalInvoices: invoiceData.totalInvoices
          };
        })
      )
      .subscribe((modInvoiceData) => {
        this.invoices = modInvoiceData.invoices;
        this.invoicesUpdated.next({
          invoices: [...this.invoices],
          invoiceCount: modInvoiceData.totalInvoices
        });
      });
  }

  createInvoice(
    item: string,
    date: string,
    due: string,
    qty: number,
    rate: number,
    tax: number
  ) {
    const invoiceData = {
      item: item,
      date: date,
      due: due,
      qty: qty,
      rate: rate,
      tax: tax
    };
    this._http
      .post<{ message: string; invoice: Invoice }>(this._url, invoiceData)
      .subscribe({
        next: () => {
          this._snackBar.open("Invoice created!", "Success", {
            duration: 2000
          });
          // this._router.navigate(['/']);
          this._router.navigate(["dashboard", "invoices"]);
        },
        error: (error) => {
          this.errorHandler(error, "Invoice creation failed!");
        }
      });
  }

  getOneInvoice(id: string) {
    return this._http.get<Invoice>(this._url + "/" + id);
  }

  updateInvoice(
    id: string,
    item: string,
    date: string,
    due: string,
    qty: number,
    rate: number,
    tax: number
  ) {
    const invoiceData = {
      id: id,
      item: item,
      date: date,
      due: due,
      qty: qty,
      rate: rate,
      tax: tax
    };
    this._http.put(this._url + "/" + id, invoiceData).subscribe({
      next: () => {
        this._snackBar.open("Invoice updated!", "Success", {
          duration: 2000
        });
        // this._router.navigate(['/']);
        this._router.navigate(["dashboard", "invoices"]);
      },
      error: (error) => {
        this.errorHandler(error, "Invoice update failed!");
      }
    });
  }

  deleteInvoice(invoiceId: string) {
    return this._http.delete(this._url + "/" + invoiceId);
  }

  getInvoiceListener() {
    return this.invoicesUpdated.asObservable();
  }

  errorHandler(error: any, message: any) {
    // console.error(error);
    this._snackBar.open(message, "Error", {
      duration: 2000
    });
  }
}
