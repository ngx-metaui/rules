import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeadingsListService {
  navList: Subject<HTMLElement[]>;

  constructor() {
    this.navList = new Subject();
  }

  getHeaders(element) {
    const headings: HTMLElement[] = element.querySelectorAll('h1[id], h2[id], h3[id], h4[id]');

    this.navList.next(headings);
  }
}
