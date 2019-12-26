import {Component, OnInit} from '@angular/core';
import {Invoice} from '../model/invoice';
import {ActivatedRoute, Router} from '@angular/router';
import {ActionItem} from '@fundamental-ngx/platform';

export const buttonItemsView: ActionItem[] = [
  {
    label: 'Edit',
    type: undefined,
    priority: 10,
    compact: false,
    editTitle: false,
    options: 'emphasized'
  }
];

@Component({
  selector: 'fdp-invoice-view-v',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.scss']
})
export class InvoiceViewComponent implements OnInit {
  invoice: Invoice;
  butItemsView = buttonItemsView;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const op = this.route.snapshot.url[1].path;

    if (op !== 'view') {
      if (!this.route.snapshot.params.id) {
        throw new Error(`Operation ${op} cannot be used in the view Page.`);
      }
    }

    this.load(parseInt(this.route.snapshot.params.id));
  }


  onBackButtonClick() {
    window.history.back();
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
      } else {
        throw new Error('No Data to load');
      }
    }
  }

  onActionClicked(event: ActionItem) {
    this.router.navigate([`/demo/invoice/edit/${this.route.snapshot.params.id}`]);
  }

  goToUser() {
    this.router.navigate(['/demo/entity/detail/User/' + this.invoice.requestor.uniqueName]);
  }

  goToSupplier() {
    this.router.navigate(['/demo/entity/detail/Supplier/' + this.invoice.supplier.uniqueName]);
  }
}

