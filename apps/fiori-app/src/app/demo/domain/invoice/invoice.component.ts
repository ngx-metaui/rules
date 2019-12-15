import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Invoice} from '../model/invoice';
import {ArrayComboBoxDataSource, ComboBoxDataSource} from '@ngx-metaui/fiori-rules';
import {User} from '../model/user';
import {Address} from '../model/address';
import {AddressCSV, addressDB} from '../rest/address';
import {UserCSV, userDB} from '../rest/user';
import {PaymentTerms} from '../model/payment-terms';
import {PaymentTermsCSV, paymentTermsDB} from '../rest/payment-terms';
import {ActionItem} from '@fundamental-ngx/platform';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {debounceTime, tap} from 'rxjs/operators';


export const buttonItems: ActionItem[] = [
  {
    label: 'Reset',
    type: 'standard',
    priority: 1,
    compact: false,
    editTitle: false,
    options: 'emphasized'
  },
  {
    label: 'Submit',
    type: undefined,
    priority: 10,
    compact: false,
    editTitle: false,
    options: 'emphasized'
  }
];

@Component({
  selector: 'fdp-shop',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit, OnDestroy {
  butItems = buttonItems;
  form: FormGroup = new FormGroup({});
  invoice: Invoice;
  userDataSource: ComboBoxDataSource<User>;
  addressDataSource: ComboBoxDataSource<Address>;
  paymentTerms: PaymentTerms[];

  operation: string;


  private autoSaveSub: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.operation = this.route.snapshot.url[1].path;

    if (this.operation === 'edit' || this.operation === 'view') {
      if (!this.route.snapshot.params.id) {
        throw new Error('View or Edit Operation must have ID');
      }
      this.load(parseInt(this.route.snapshot.params.id));

    } else {
      this.load();
      this.initAutosave();
    }
    this.initDataSources();
  }

  ngOnDestroy() {
    this.autoSaveSub.unsubscribe();
  }


  required(): ValidatorFn[] {
    return [Validators.required];
  }

  onBackButtonClick() {
    this.router.navigate(['/demo']);
  }

  onActionClicked(event: ActionItem) {
    if (event.label === 'reset') {
      localStorage.removeItem('in-progress');
      this.form.patchValue({});
      this.invoice = null;
    } else {
      const invoice: Invoice = this.form.value;
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({onlySelf: true});
      });

      if (this.form.valid) {
        const items = localStorage.getItem('invoices') || '[]';
        if (items) {
          console.log('Saveing: ', JSON.stringify(invoice));
          const invoices: any[] = JSON.parse(items);

          invoice.internalId = invoices.length + 1;
          invoice.uniqueName = 'INV-' + invoices.length + 1;
          invoices.push(invoice);
          localStorage.setItem('invoices', JSON.stringify(invoices));
          localStorage.removeItem('in-progress');
        }
      }
    }
  }


  private initDataSources() {
    this.userDataSource = new ArrayComboBoxDataSource<User>(
      userDB.map((i: UserCSV) => {

        const user = i.Name.split(' ');

        return new User(
          i.UniqueName, i.Name, user[0].trim(), user[1].trim(), i.Organization, i.EmailAddress,
          'US004', i.LocaleID, i.DefaultCurrency, '');
      }));


    this.addressDataSource = new ArrayComboBoxDataSource<Address>(
      addressDB.map((i: AddressCSV) => {

        return new Address(
          i.UniqueName, i.Name, i.Lines, i.City, i.State, i.PostalCode + '',
          i.Phone, i.Fax, i.Email, i.URL, i.Country);
      }));


    this.paymentTerms = paymentTermsDB.map((i: PaymentTermsCSV) => {
      return new PaymentTerms(i.UniqueName, i.Name, i.Description);
    });
  }


  private initAutosave() {
    this.autoSaveSub = this.form.valueChanges
      .pipe(
        debounceTime(500),
        tap(change => {
          if (this.form.dirty) {
            console.log(this.form.value);
            localStorage.setItem('in-progress', JSON.stringify(this.form.value));
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

