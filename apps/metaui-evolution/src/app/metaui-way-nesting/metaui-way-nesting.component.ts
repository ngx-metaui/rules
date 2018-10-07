import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {Address} from '../model/address';
import {Order} from '../model/order';
import {Money} from '@ngx-meta/rules';


/**
 * This is 1:1 copy from the playground as I though it might be good to place it as a next
 * next to show besides rendering flat object structure as can also do this.
 */
@Component({
  selector: 'app-metaui-way-nesting',
  templateUrl: './metaui-way-nesting.component.html',
  styleUrls: ['./metaui-way-nesting.component.scss']
})
export class MetauiWayNestingComponent implements OnInit {

  myPO: Order;


  constructor() {
  }

  ngOnInit() {
    this.myPO = new Order('PO20180001', 'iPhone 11 5d touch',
      new Date(), 'Shipping',
      new User('zchapple', 'Zack', 'Chapple'),
      new Money(1000, 'USD'),
      new Address('Frank Kolar', 'Davey Glen 111', 'Foster City',
        '94404', 'US'),
      new Address('Frank Kolar', 'Zelena 400', 'Prague',
        '14000', 'Czech republic'),
      'The iPhone X is intended to showcase what Apple considers ' +
      'technology of ' +
      'the future, specifically adopting OLED screen technology for the first time ' +
      'in iPhone ' +
      'history, as well as using a glass and stainless-steel form factor, offering ' +
      'wireless ' +
      'charging, and removing the home button in favor of introducing a new bezel-less ' +
      'design, ' +
      'almost removing all the bezels in the smartphone and not having a "chin", unlike' +
      ' many ' +
      'Android phones'
    );
  }

}
