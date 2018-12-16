import {Entity} from '@ngx-metaui/rules';

/**
 * This is generated class
 */
export class Airline implements Entity {


  constructor(
    public id?: string,
    public name?: string,
    public aliance?: string,
    public country?: string) {
  }

  identity(): string {
    return this.id;
  }


  getTypes(): any {
    return {
      id: String,
      name: String,
      aliance: String,
      country: String
    };
  }


  /**
   * Used by MetaUI to identify the name of the class once everything is minified
   */
  className(): string {
    return 'Airline';
  }

  toString(): string {
    return this.name;
  }
}
