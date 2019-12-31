import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Invoice} from '../model/invoice';
import {DATA_PROVIDERS, DataProvider} from '@ngx-metaui/fiori-rules';
import {ActivatedRoute, Router} from '@angular/router';
import {META_RULES, MetaRules} from '@ngx-metaui/rules';


@Component({
  selector: 'fdp-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  invoice: Invoice;
  operation = 'edit';


  constructor(@Inject(META_RULES) protected meta: MetaRules,
              @Inject(LOCALE_ID) public locale: string,
              @Inject(DATA_PROVIDERS) private providers: Map<string, DataProvider<any>>,
              private router: Router, private route: ActivatedRoute) {

  }


  ngOnInit(): void {
    this.operation = this.route.snapshot.url[0].path;
    this.loadInvoice();
  }

  changeOP(op: string) {
    this.router.navigate(['/mdemo/', op]);
  }

  private loadInvoice() {
    this.invoice = Invoice.fromJSON(localStorage.getItem('demo-invoice'));
  }

}

