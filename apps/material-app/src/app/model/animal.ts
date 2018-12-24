import {Entity} from '@ngx-metaui/rules';


export class Animal implements Entity {


  constructor(
    public name?: string,
    public sound?: string) {
  }

  identity(): string {
    return this.name;
  }


  getTypes(): any {
    return {
      name: String,
      sound: String
    };
  }


  /**
   * Used by MetaUI to identify the name of the class once everything is minified
   */
  className(): string {
    return 'Animal';
  }

  toString(): string {
    return this.sound;
  }
}
