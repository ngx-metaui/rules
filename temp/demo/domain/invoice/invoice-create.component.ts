import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Invoice} from '../model/invoice';
import {User} from '../model/user';
import {Address} from '../model/address';
import {AddressCSV, addressDB} from '../rest/address';
import {UserCSV, userDB} from '../rest/user';
import {PaymentTermsCSV, paymentTermsDB} from '../rest/payment-terms';
import {BaseDataProvider} from '@fundamental-ngx/platform';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {debounceTime, tap} from 'rxjs/operators';


@Component({
  selector: 'fdp-invoice-c',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.scss']
})
export class InvoiceCreateComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({});
  invoice: Invoice = new Invoice();
  userDataSource: BaseDataProvider<User>;
  addressDataSource: BaseDataProvider<Address>;
  paymentTerms: string[];

  operation: string;

  private autoSaveSub: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.operation = this.route.snapshot.url[1].path;

    this.load();
    this.initAutosave();
    this.initDataSources();
  }

  ngOnDestroy() {
    this.autoSaveSub.unsubscribe();
  }


  required(): ValidatorFn[] {
    return [Validators.required];
  }

  onBackButtonClick() {
    window.history.back();
  }

  onActionClicked(op: string) {
    if (op === 'Reset') {
      localStorage.removeItem('in-progress');
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.reset(undefined, {onlySelf: true, emitEvent: true});
      });
      this.invoice = null;
    } else {
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
          invoice.uniqueName = `INV-${invoice.internalId}`;
          invoices.push(invoice);
        }
        localStorage.setItem('invoices', JSON.stringify(invoices));
        localStorage.removeItem('in-progress');
      }
    }
  }

  private initDataSources() {
    this.userDataSource = new BaseDataProvider<User>(
      userDB.map((i: UserCSV) => {

        const user = i.Name.split(' ');

        return new User(
          i.UniqueName, i.Name, user[0].trim(), user[1].trim(), i.Organization, i.EmailAddress,
          'US004', i.LocaleID, i.DefaultCurrency, '');
      }));


    this.addressDataSource = new BaseDataProvider<Address>(
      addressDB.map((i: AddressCSV) => {

        return new Address(
          i.UniqueName, i.Name, i.Lines, i.City, i.State, i.PostalCode + '',
          i.Phone, i.Fax, i.Email, i.URL, i.Country);
      }));


    this.paymentTerms = paymentTermsDB.map((i: PaymentTermsCSV) => {
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

