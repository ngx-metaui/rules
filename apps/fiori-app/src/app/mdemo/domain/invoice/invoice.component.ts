import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  LOCALE_ID,
  OnDestroy,
  OnInit
} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Invoice} from '../model/invoice';
import {DATA_PROVIDERS, DataProvider} from '@ngx-metaui/fiori-rules';
import {PaymentTermsCSV, paymentTermsDB} from '../rest/payment-terms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {debounceTime, tap} from 'rxjs/operators';
import {META_RULES, MetaRules} from '@ngx-metaui/rules';


@Component({
  selector: 'fdp-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({});
  invoice: Invoice = new Invoice();
  paymentTermsDS: string[];


  operation: string;

  private autoSaveSub: Subscription;

  constructor(@Inject(META_RULES) protected meta: MetaRules,
              @Inject(LOCALE_ID) public locale: string,
              @Inject(DATA_PROVIDERS) private providers: Map<string, DataProvider<any>>,
              private router: Router, private route: ActivatedRoute) {

    console.log(locale);
  }

  ngOnInit(): void {
    this.operation = this.route.snapshot.url[1].path;
    this.meta.registerDependency('controller', this);

    this.load(parseInt(this.route.snapshot.params.id) || null);
    this.initDataSources();

    if (this.operation !== 'view') {
      this.initAutosave();
    }
  }

  ngOnDestroy() {
    if (this.operation !== 'view') {
      this.autoSaveSub.unsubscribe();
    }
  }


  required(): ValidatorFn[] {
    return [Validators.required];
  }

  onBackButtonClick() {
    window.history.back();
  }

  onAction(action: string) {
    if (action === 'reset') {
      localStorage.removeItem('in-progress');
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.reset(undefined, {onlySelf: true, emitEvent: true});
      });
      this.invoice = null;
    } else if (action === 'edit') {
      this.router.navigate([`/mdemo/invoice/edit/${this.route.snapshot.params.id}`]);
    } else if (action === 'save') {
      this.doSave();
      this.onBackButtonClick();
    }
  }


  private doSave() {
    const invoice: Invoice = this.form.value;
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control.markAsTouched({onlySelf: true});
    });

    if (this.form.valid) {
      const items = localStorage.getItem('invoices') || '[]';
      if (items) {
        const invoices: any[] = JSON.parse(items);

        if (invoice.internalId) {
          invoices[invoice.internalId - 1] = invoice;
        } else {
          invoice.internalId = (invoices.length + 1);
          invoices.push(invoice);
        }
          invoice.uniqueName = `INV-${invoice.internalId}`;

        localStorage.setItem('invoices', JSON.stringify(invoices));
        localStorage.removeItem('in-progress');
      }
    }
  }

  private initDataSources() {
    this.paymentTermsDS = paymentTermsDB.map((i: PaymentTermsCSV) => {
      return i.Name;
    });
  }


  private initAutosave() {
    this.autoSaveSub = this.form.valueChanges
      .pipe(
        debounceTime(1500),
        tap(change => {
          if (this.form.dirty) {
            if (this.form.value && this.form.value.internalId) {
              this.doSave();
            } else {
              localStorage.setItem('in-progress', JSON.stringify(this.form.value));
            }
          }
        })
      )
      .subscribe();
  }

  private load(id?: number) {
    if (id) {
      const items = localStorage.getItem('invoices');
      if (items) {
        const invoices: any[] = JSON.parse(items);
        invoices.forEach((i) => {
          if (id === i['internalId']) {
            this.invoice = Invoice.fromJSON(JSON.stringify(i));
            this.form.setControl('internalId', new FormControl(id));
          }
        });
      }
    } else {
      const itemInProgress = localStorage.getItem('in-progress');
      if (itemInProgress) {
        this.invoice = Invoice.fromJSON(itemInProgress);
      }
    }
  }
}

