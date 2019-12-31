import {Component, OnInit} from '@angular/core';
import {Invoice} from '../model/invoice';


@Component({
  selector: 'fdp-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  invoice: Invoice;
  operation = 'edit';


  constructor() {
  }

  ngOnInit(): void {
    this.loadInvoice();
  }


  private loadInvoice() {
    this.invoice = Invoice.fromJSON(localStorage.getItem('demo-invoice'));
  }

}

