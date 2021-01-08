import {Component} from '@angular/core';
import {animate, keyframes, query, stagger, style, transition, trigger} from '@angular/animations';


export const textAnimation = trigger('textAnimation', [
  transition('* => *', [
    query(':enter', [
      stagger(2500, [
        style({transform: 'translateY(-100px)', opacity: '0'}),
        animate('5s', keyframes([
          style({transform: 'translateY(-100px)', opacity: '1'}),
          style({transform: 'translateY(0)', opacity: '1'}),
          style({transform: 'translateY(0)', opacity: '1'}),
          style({transform: 'translateY(100px)', opacity: '0'})
        ]))
      ])
    ], {optional: true})
  ])
]);

@Component({
  selector: 'fdp-portlet-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  news: Array<NewsItem>;

  constructor() {
  }

  ngOnInit() {
    this.news = [
      {
        text: 'SAP Ariba Integrates with Givewith Platform, Enabling Buyers and ' +
          'Suppliers to Drive Social Impact Through B2B Transactions.',
        link: 'http://www.ariba.com'
      },
      {
        text: 'SAP, Hyundai AutoEver join hands to develop cloud software',
        link: 'http://www.ariba.com'
      },
      {
        text: 'SAP Ariba Integrates with Givewith Platform, Enabling Buyers and ' +
          'Suppliers to Drive Social Impact Through B2B Transactions',
        link: 'http://www.ariba.com'
      }

    ];
  }

}


export interface NewsItem {
  text: string;
  link: string;
}
