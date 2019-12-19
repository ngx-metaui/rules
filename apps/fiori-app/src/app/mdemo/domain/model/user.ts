import {Entity} from '@ngx-metaui/rules';

export class User implements Entity {


  constructor(
    public uniqueName?: string,
    public fullName?: string,
    public firstName?: string,
    public lastName?: string,
    public organization?: string,
    public email?: string,
    // public supervisor?: User,
    public purchasingUnit?: string,
    public locale?: string,
    public defaultCurrency?: string,
    public description?: string) {
  }

  identity(): string {
    return this.uniqueName;
  }


  getTypes(): any {
    return {
      uniqueName: String,
      firstName: String,
      lastName: String,
      fullName: String,
      email: String,
      defaultCurrency: String,
      organization: String,
      locale: String,

      // supervisor: String,
      purchasingUnit: String,
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
    return `${this.lastName} ${this.firstName} (${this.purchasingUnit})`;
  }
}
