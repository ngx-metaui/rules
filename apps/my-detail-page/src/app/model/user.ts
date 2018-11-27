import {Entity} from '@ngx-metaui/rules';

/**
 * This is generated class
 */
export class User implements Entity {


  constructor(
    // strings
    public uniqueName?: string,
    public name?: string,
    public description?: string,
    // Date
    public created?: Date,
    // number
    public age?: number,
    // Chooser
    public luckyNumbers?: number[],
    // Checkboxess
    public favColors?: string[],
    // Dropdown
    public status?: string,
    // Radio
    public drivingSkill?: string,
    // boolean
    public isAngularDeveloper: boolean = false) {
  }

  identity(): string {
    return this.uniqueName;
  }


  getTypes(): any {
    return {
      uniqueName: String,
      name: String,
      description: String,
      created: Date,
      age: Number,
      luckyNumbers: Array(Number),
      favColors: Array(String),
      status: String,
      drivingSkill: String,
      isAngularDeveloper: Boolean
    };
  }

  isValidCreateDate(): boolean {
    const dateNow = new Date();
    return (this.created && this.created < dateNow);
  }

  /**
   * Used by MetaUI to identify the name of the class once everything is minified
   */
  className(): string {
    return 'User';
  }

  toString(): string {
    return this.name;
  }
}
