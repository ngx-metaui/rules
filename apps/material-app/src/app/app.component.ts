import {Component, OnInit} from '@angular/core';
import {RoutingService} from '@ngx-metaui/rules';


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

  constructor(public routingService: RoutingService) {
  }

  ngOnInit(): void {

  }

}
