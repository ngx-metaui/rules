import {Component} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {SelectItem} from '@ngx-metaui/fiori-rules';

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
  private radio1: FormControl;
  private radio2: FormControl;
  locations: Array<SelectItem> = [];
  topings: Array<SelectItem> = [];

  model: FormControl = new FormControl(true);
  model2: FormControl;


  constructor() {

    this.form = new FormGroup({});
    this.control = new FormControl('blue');

    this.radio2 = new FormControl('blue');

    const o = [];
    o.push(new SupplierLocation('123', 'Palo Alto', 'asdfasfd'));
    o.push(new SupplierLocation('12443', 'Prague', 'asdfasfd'));
    o.push(new SupplierLocation('2222', 'Bangalor', 'asdfasfd'));

    this.locations = o.map((item: SupplierLocation) => {
        return {
          label: item.name,
          disabled: false,
          value: item

        };
      }
    );

    this.radio1 = new FormControl(this.locations[2], Validators.required);

    this.validators = [
      Validators.maxLength(10)];

    this.topings = [new Topings('aa', 'Tomatos'),
      new Topings('bb', 'Blueberries'),
      new Topings('cc', 'Ketchup')].map((item: Topings) => {
        return {
          label: item.name,
          disabled: false,
          value: item
        };
      }
    );


    const checkRequired: ValidatorFn = (control: FormControl): ValidationErrors | null => {

      console.log('contr');
      const val = control.value;
      return !val || val.length ? {'sssssss': true} : null;
    };

    this.model2 = new FormControl([this.topings[1]], checkRequired);

  }
}

class SupplierLocation {
  constructor(public id: string, public name: string, public descriptin: string) {
  }
}


class Topings {
  constructor(public id: string, public name: string) {
  }
}
