import {Entity} from '@ngx-metaui/rules';

export class PaymentTerms implements Entity {


  constructor(
    public uniqueName?: string,
    public name?: string,
    public description?: string) {
  }

  identity(): string {
    return this.uniqueName;
  }


  getTypes(): any {
    return {
      uniqueName: String,
      name: String,
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
    return this.name;
  }
}
