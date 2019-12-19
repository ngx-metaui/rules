import {Component} from '@angular/core';


@Component({
  selector: 'fdp-portlet-commodity',
  templateUrl: './commodity.component.html',
  styleUrls: ['./commodity.component.scss']
})
export class CommodityComponent {
  tableRows: Array<any>;

  constructor() {
  }

  ngOnInit() {

    this.tableRows = [
      {
        id: 'PR9333',
        date: '09/21/2019',
        type: 'sales-order-item',
        read: 'accept'
      },
      {
        id: 'PR3333',
        date: '09/21/2019',
        type: 'sales-order-item'
      },
      {
        id: 'PO0012',
        date: '09/21/2019',
        type: 'retail-store-manager',
        read: 'accept'
      },
      {
        id: 'INV8271',
        date: '09/21/2019',
        type: 'money-bills',
        read: 'accept'
      },
      {
        id: 'INV8271',
        date: '09/21/2019',
        type: 'money-bills'
      },
      {
        id: 'INV8271',
        date: '09/21/2019',
        type: 'money-bills'
      },
      {
        id: 'INV8271',
        date: '09/21/2019',
        type: 'money-bills'
      }
    ];
  }

}

