import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-metaui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fiori-app';
  control: FormControl;


  constructor() {

    this.control = new FormControl('Some Text', [
      Validators.required,
      Validators.maxLength(10),
    ]);

  }
}
