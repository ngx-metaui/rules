import {Component, OnInit} from '@angular/core';
import {AppRoute, RoutingService} from '@ngx-metaui/rules';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';


export interface Animal {
  name: string;
  sound: string;
}


@Component({
  selector: 'ngx-metaui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  contextMenu$: Observable<AppRoute[]>;
  name = new FormControl('');

  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  constructor(public routingService: RoutingService) {
  }

  ngOnInit(): void {
    this.contextMenu$ = this.routingService.contextualCommands();
  }

}
