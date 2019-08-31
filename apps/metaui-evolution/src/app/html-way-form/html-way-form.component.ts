import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';

@Component({
    selector: 'app-html-way-form',
    templateUrl: './html-way-form.component.html',
    styleUrls: ['./html-way-form.component.scss']
})
export class HtmlWayFormComponent implements OnInit {

  errorMsg = '';
  userObject: User;

  constructor() {
  }

  ngOnInit() {
    this.userObject = new User('ppan', 'Peter', 'Pan', 8,
      new Date());
  }


  hasErrors(): boolean {
    return false;
  }

}
