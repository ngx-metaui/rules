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
  form: FormGroup;
  private validators: ValidatorFn[];

  colors = ['blue', 'green', 'red'];
  locations: Array<SelectItem> = [];
  topings: Array<SelectItem> = [];


  data: SomeObject;

  constructor() {

    this.form = new FormGroup({});
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
      const val = control.value;
      return !val || val.length ? {'sssssss': true} : null;
    };

    this.data = new SomeObject('Fred', '3420 Hills View, Palo Alto',
      'ariba@sap.com', 'blue', o[1], true,
      'Flinstone', 123, 'A123-11', new Date(2019, 11, 3),
      [new Topings('aa', 'Tomatos')], 'xx');
  }
}

class SomeObject {
  constructor(public firstName: string,
              public address: string,
              public email: string,
              public color: string,
              public location: SupplierLocation,
              public userConfirmation: boolean,
              public lastName: string,
              public amount: number,
              public accInfo: string,
              public startDate: Date,
              public topings: Array<Topings>,
              public description: string) {
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
