import {Entity} from '@ngx-metaui/rules';

/**
 * This is generated class
 */
export class User implements Entity {


  constructor(
    public title?: string,
    public uniqueName?: string,
    public firstName?: string,
    public lastName?: string,
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
