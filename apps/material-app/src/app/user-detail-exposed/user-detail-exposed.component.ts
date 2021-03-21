import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  Inject,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import {Action, UIMeta} from '@ngx-metaui/rules';
import {User} from '../model/user';
import {Airline} from '../model/airline';
import {Animal} from '../model/animal';
import {MatFormField} from '@angular/material/form-field';
import {MetaFFAdapter} from '@ngx-metaui/material-rules';
import {AbstractControl, ValidatorFn, Validators} from '@angular/forms';


@Component({
  selector: 'ngx-metaui-useri',
  templateUrl: './user-detail-exposed.component.html',
  styleUrls: ['./user-detail-exposed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailExposedComponent implements OnInit, DoCheck, AfterViewInit {
  object: User;

  operation = 'edit';
  airlines: Airline[];
  airline: Airline;
  animals: Animal[];
  animal: Animal;

  viewInit: Record<string, number> = {};

  @ViewChildren('ff')
  formFields: QueryList<MatFormField>;


  constructor(protected meta: UIMeta,
              private cd: ChangeDetectorRef) {
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

  ngDoCheck(): void {
  }


  ngAfterViewInit(): void {
    this.formFields.forEach((formField) => {
      formField._control.ngControl.statusChanges
        .subscribe((value => {
          const ngControl = formField._control.ngControl;
          if (ngControl && ngControl.control && !ngControl.control.pristine) {
            ngControl.control.setValidators(Validators.compose(this.createValidators(formField)));
            ngControl.control.markAsPristine();
            ngControl.control.markAsUntouched();
          }
        }));
    });

  }


  @Action({applyTo: User, message: 'Role was assigned'})
  assignRole($event: any) {
    console.log('onDynamicAction(): Method called');
  }


  @Action({applyTo: User, message: 'Account is active'})
  deactivateAccount($event: any) {
    console.log('onDynamicAction(): Method called');
  }

  private createValidators(formField: MatFormField): ValidatorFn[] {
    const metaValidator = (control: AbstractControl): { [key: string]: any } => {
      const metaContext = (formField._control as MetaFFAdapter).renderer.metaContext;
      const editing = metaContext.context.booleanPropertyForKey('editing', false);

      if (editing) {
        const errorMsg = metaContext.context.validateErrors();
        return errorMsg ? {'metavalid': {'msg': errorMsg}} : null;
      }
      return null;
    };
    return [metaValidator];
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

