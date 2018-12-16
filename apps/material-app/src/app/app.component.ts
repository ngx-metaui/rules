import {ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {User} from './model/user';
import {META_RULES, MetaRules} from '@ngx-metaui/rules';
import {Airline} from './model/airline';
import {InputField} from '../../../../libs/material-rules/src/lib/ui/input/input.component';


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
  object: User;

  @ViewChild('aaa')
  mdInput: InputField;

  operation = 'edit';

  airlines: Airline[];


  constructor(@Inject(META_RULES) protected meta: MetaRules, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.object = new User('R0001', 'FK0001',
      'Fred', 'Flinstone', 'Blue',
      new Airline('OK', 'Czech Airlines', 'SkyTeam', 'Czechia'),
      'Some short description');


    this.airlines = new AirlineDataService().fetch();
    this.meta.registerDependency('controller', this);
  }


  selectionChange() {

  }

}

export class AirlineDataService {
  fetch(): Airline[] {
    return [
      new Airline('US', 'US Airways', 'Star Alliance', 'USA'),
      new Airline('UA', 'American Airlines', 'Star Alliance', 'USA'),
      new Airline('OK', 'Czech Airlines', 'SkyTeam', 'Czechia'),
      new Airline('AF', 'Air France', 'SkyTeam', 'France')
    ];

  }
}
