import {Component, OnInit} from '@angular/core';

import * as dynComponents from './dymamic-components';
import {Router} from '@angular/router';
import {ComponentRegistry} from '@ngx-metaui/rules';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  states: string[] = ['html', 'component', 'metaui', 'metaui2', 'metaui3', 'module'];
  statusName: string[] = ['basic html', 'with component', 'basic metaui', 'metaUI stack',
    'metaUI nesting', 'modules'];

  currState = 'html';
  evolutions: string[] = ['/html', '/component', '/metaui', '/metaui2', '/metaui3', '/module'];

  currentIndex: number = 0;
  currRoute: string;


  header: any;


  constructor(componentRegistry: ComponentRegistry, private router: Router) {
    componentRegistry.registerTypes(dynComponents);
    this.currRoute = this.evolutions[0];
  }


  ngOnInit(): void {

  }

  next(): void {
    this.currentIndex++;
    if (this.currentIndex > this.evolutions.length - 1) {
      this.currentIndex = 0;
    }
    this.currRoute = this.evolutions[this.currentIndex];

    this.currState = this.currRoute.substring(1);
    this.router.navigate([this.currRoute]);
  }

  prev(): void {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.evolutions.length - 1;
    }
    this.currRoute = this.evolutions[this.currentIndex];

    this.currState = this.currRoute.substring(1);
    this.router.navigate([this.currRoute]);
  }
}
