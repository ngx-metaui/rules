import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';

@Component({
    selector: 'app-component-way-form',
    templateUrl: './component-way-form.component.html',
    styleUrls: ['./component-way-form.component.scss']
})
export class ComponentWayFormComponent implements OnInit {
  userObject: User;

  constructor() {
  }

  ngOnInit() {
    this.userObject = new User('ppan', 'Peter', 'Pan', 8,
      new Date());
  }

}
