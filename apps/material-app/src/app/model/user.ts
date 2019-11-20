import {Entity, Property, Trait} from '@ngx-metaui/rules';
import {Airline} from './airline';
import {Animal} from './animal';

/**
 * This is generated class
 */
export class User implements Entity {


  constructor(
    @Trait.Required()
    @Property.Label('My Title')
    public title?: string,

    public uniqueName?: string,
    public firstName?: string,
    public lastName?: string,

    @Trait.Required()
    public favColor?: string,
    public birthDate?: Date,
    public prefAirline?: Airline,
    public favAnimal?: Animal,
    public toppings?: string[],
    public isChecked: boolean = false,

    @Trait.Traits(['fluid', 'longtext'])
    public description?: string) {
  }

  identity(): string {
    return this.uniqueName;
  }


  getTypes(): any {
    return {
      title: String,
      uniqueName: String,
      firstName: String,
      lastName: String,
      favColor: String,
      birthDate: Date,
      favAnimal: Animal,
      toppings: Array(String),
      isChecked: Boolean,
      prefAirline: Airline,
      description: String
    };
  }


  /**
   * Used by MetaUI to identify the name of the class once everything is minified
   */
  className(): string {
    return 'User';
  }

  toString(): string {
    return this.lastName;
  }
}
