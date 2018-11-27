import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  object: User;
  operation = 'edit';

  cities = ['New York', 'Prague', 'Brno', 'San Franscico', 'Los Angeles'];
  selections: string[] = [];


  checked = true;

  constructor() {
  }

  ngOnInit(): void {

    this.object = new User('R0001', 'Frank Kolar',
      'This is my ' +
      'user record', new Date(), 20, [1, 2],
      ['blue', 'red'], 'Checked', 'Good', true);
  }
}

export class MyDBService {


  constructor() {
  }

  public save(): void {
    alert('Record is saved');
  }
}
