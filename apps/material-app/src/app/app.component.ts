import {Component, OnInit} from '@angular/core';
import {User} from './model/user';

@Component({
  selector: 'ngx-metaui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'material-app';
  value = 'Clear me';

  object: User;


  constructor() {
  }

  ngOnInit(): void {
    this.object = new User('R0001', 'FK0001',
      'Fred', 'Flinstone', 'Some short description');
  }


  click(): void {

  }

}
