import {Entity} from '@ngx-metaui/rules';
import {Money} from '@ngx-metaui/fiori-rules';
import {Address} from './address';
import {User} from './user';
import {Supplier} from './supplier';

export class Invoice implements Entity {

  constructor(public uniqueName?: string,
              public name?: string,
              public requestor?: User,
              public createdDate?: Date,
              public needBy?: Date,
              public status?: string,
              public supplier?: Supplier,
              public purchaseOrder?: string,
              public purchasingUnit?: string,
              public paymentTerms?: string,
              public taxInvoiceNumber?: string,
              public totalAmount?: Money,
              public billingAddress?: Address,
              public shippingAddress?: Address,
              public description?: string,
              public internalId?: number,
              public isShared?: boolean,
              public accountCategory?: string) {
    this.createdDate = new Date();
  }


  identity(): string {
    return this.uniqueName;
  }


  getTypes(): any {
    return {
      uniqueName: String,
      name: String,
      requestor: User,
      createdDate: Date,
      needBy: Date,
      status: String,
      supplier: Supplier,
      purchaseOrder: String,
      purchasingUnit: String,
      paymentTerms: String,
      taxInvoiceNumber: String,
      totalAmount: Money,
      billingAddress: Address,
      shippingAddress: Address,
      description: String,
      internalId: Number,
      isShared: Boolean,
      accountCategory: String
    };
  }


  className(): string {
    return 'Invoice';
  }


  static fromJSON(json: string) {
    return JSON.parse(json, (key: string, value: any) => {

        if (!value) {
          return value;
        }
        switch (key) {
          case 'requestor':
            return new User(value['uniqueName'], value['fullName'], value['firstName'],
              value['lastName'], value['organization'], value['email'], value['purchasingUnit'],
              value['locale'], value['defaultCurrency'], value['description']);

          case 'supplier':
            return new Supplier(value['uniqueName'], value['name'], value['locationName'],
              value['contact'], value['lines'], value['city'], value['state'],
              value['postalCode'], value['country'], value['phone'], value['email']);
          case 'createdDate':
          case 'needBy':
            return new Date(value);
          case 'totalAmount':
            return new Money(value['amount'], value['currency'], value['locale']);
          case 'billingAddress':
          case 'shippingAddress':
            return new Address(value['uniqueName'], value['name'], value['lines'], value['city'],
              value['state'], value['postalCode'], value['phone'], value['fax'],
              value['email'], value['url'], value['country']);
          default: {
            if (!key) {
              return new Invoice(value['uniqueName'], value['name'], value['requestor'],
                value['createdDate'], value['needBy'], value['status'], value['supplier'],
                value['purchaseOrder'],
                value['purchasingUnit'], value['paymentTerms'], value['taxInvoiceNumber'],
                value['totalAmount'], value['billingAddress'], value['shippingAddress'],
                value['description'], value['internalId'], value['isShared'],
                value['accountCategory']);
            } else {
              return value;
            }
          }
        }
      }
    );
  }
}
