import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {User} from './model/user';
import {META_RULES, MetaRules} from '@ngx-metaui/rules';
import {Airline} from './model/airline';
import {Animal} from './model/animal';


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

  operation = 'view';
  airlines: Airline[];
  airline: Airline;
  animals: Animal[];
  animal: Animal;



  constructor(@Inject(META_RULES) protected meta: MetaRules, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.airlines = new AirlineDataService().fetch();
    this.animals = new AnimalDataService().fetch();
    this.meta.registerDependency('controller', this);

    this.airline = this.airlines[2];
    this.animal = this.animals[2];

    this.object = new User('R0001', 'FK0001',
      'Fred', 'Flinstone', 'Blue', new Date(),
      new Airline('OK', 'Czech Airlines', 'SkyTeam', 'Czechia'),
      this.animal, [], false, 'Some short description');

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

export class AnimalDataService {
  fetch(): Animal[] {
    return [
      new Animal('Dog', 'Woof'),
      new Animal('Cat', 'Meow'),
      new Animal('Cow', 'Moo'),
      new Animal('Fox', 'Wa-pa-pa-pa-pa-pa-pow')
    ];

  }
}

