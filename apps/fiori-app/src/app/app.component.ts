import {Component} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-metaui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fiori-app';
  control: FormControl;
  control2: FormControl;
  form: FormGroup;
  private validators: ValidatorFn[];

  colors = ['blue', 'green', 'red'];


  constructor() {

    this.form = new FormGroup({});

    this.control = new FormControl('blue');


    this.validators = [
      Validators.maxLength(10)];
  }
}
