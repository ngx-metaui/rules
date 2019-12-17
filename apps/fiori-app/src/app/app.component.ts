import {Component} from '@angular/core';
import {User} from './model/user';


@Component({
  selector: 'fdp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private object: User;

  constructor() {

    this.object = new User('R0001', 'FK0001',
      'Fred', 'Flinstone', 'Blue', new Date());
  }

}

