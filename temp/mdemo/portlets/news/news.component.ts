import {Component} from '@angular/core';


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
