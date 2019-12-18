import {Component} from '@angular/core';


@Component({
  selector: 'fdp-portlet-documents',
  templateUrl: './my-documents.component.html',
  styleUrls: ['./my-documents.component.scss']
})
export class MyDocumentsComponent {
  tableRows: Array<any>;

  constructor() {
  }

  ngOnInit() {

    this.tableRows = [
      {
        id: 'PR9333',
        date: '09/21/2019',
        type: 'sales-order-item',
        read: 'accept',
        router: '/demo'
      },
      {
        id: 'PR3333',
        date: '09/21/2019',
        type: 'sales-order-item',
        router: '/demo'
      },
      {
        id: 'INV-01',
        date: '09/21/2019',
        type: 'money-bills',
        read: 'accept',
        router: '/demo/invoice/view/1'
      },
      {
        id: 'INV-02',
        date: '09/21/2019',
        type: 'money-bills',
        router: '/demo/invoice/view/2'
      }
    ];
  }

}

