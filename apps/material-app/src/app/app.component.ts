import {Component, OnInit} from '@angular/core';
import {AppRoute, RoutingService} from '@ngx-metaui/rules';
import {Observable} from 'rxjs';


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

  constructor(public routingService: RoutingService) {
  }

  ngOnInit(): void {
    this.contextMenu$ = this.routingService.contextualCommands();
  }

}
