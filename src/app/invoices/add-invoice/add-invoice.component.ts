import { map } from "rxjs/operators";
import { InvoiceService } from "./../../services/invoice.service";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Invoice } from "src/app/models/invoice";

@Component({
  selector: "app-add-invoice",
  templateUrl: "./add-invoice.component.html",
  styleUrls: ["./add-invoice.component.scss"]
})
export class AddInvoiceComponent implements OnInit {
  mode = "create";
  isCreate: boolean = true;
  invoice!: Invoice;
  private invoiceId!: string;
  invoiceForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _invServ: InvoiceService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe((param: ParamMap) => {
      if (param.has("id")) {
        this.mode = "edit";
        this.isCreate = false;
        // this.imageSelect = 'Change Image';
        // this.postId = param.get('id');
        let p = param.get("id");
        if (p !== null) {
          this.invoiceId = p;
        }

        // this.isLoading = true;
        this._invServ.getOneInvoice(this.invoiceId).subscribe((invoiceData) => {
          this.invoice = invoiceData;
          this.invoiceForm.patchValue(this.invoice);
        });
      } else {
        this.mode = "create";
        this.isCreate = true;
        this.invoiceId = "";
      }
    });
    this.createForm();
  }

  createForm() {
    this.invoiceForm = this._fb.group({
      item: ["", [Validators.required, Validators.minLength(3)]],
      date: ["", Validators.required],
      due: ["", Validators.required],
      qty: ["", Validators.required],
      rate: ["", Validators.required],
      tax: ["", Validators.required]
    });
  }

  onSave() {
    if (this.invoiceForm.invalid) return;
    // debugger;
    // console.log(this.invoiceForm.value);
    if (this.isCreate) {
      this._invServ.createInvoice(
        this.invoiceForm.value.item,
        this.invoiceForm.value.date,
        this.invoiceForm.value.due,
        this.invoiceForm.value.qty,
        this.invoiceForm.value.rate,
        this.invoiceForm.value.tax
      );
    } else {
      this._invServ.updateInvoice(
        this.invoiceId,
        this.invoiceForm.value.item,
        this.invoiceForm.value.date,
        this.invoiceForm.value.due,
        this.invoiceForm.value.qty,
        this.invoiceForm.value.rate,
        this.invoiceForm.value.tax
      );
    }
  }

  onCancel() {
    this._router.navigate(["../"], { relativeTo: this._route });
  }
}
