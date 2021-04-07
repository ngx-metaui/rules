import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Action, UIMeta} from '@ngx-metaui/rules';
import {User} from '../model/user';
import {Airline} from '../model/airline';
import {Animal} from '../model/animal';


@Component({
  selector: 'ngx-metaui-user',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  object: User;

  operation = 'view';
  airlines: Airline[];
  airline: Airline;
  animals: Animal[];
  animal: Animal;


  constructor(protected meta: UIMeta, private cd: ChangeDetectorRef) {
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


  @Action({applyTo: User, message: 'Role was assigned'})
  assignRole($event: any) {
    console.log('onDynamicAction(): Method called');
  }


  @Action({applyTo: User, message: 'Account is active'})
  deactivateAccount($event: any) {
    console.log('onDynamicAction(): Method called');
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

