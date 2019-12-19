import {Entity} from '@ngx-metaui/rules';

export class Supplier implements Entity {


  constructor(
    public uniqueName?: string,
    public name?: string,
    public locationName?: string,
    public contact?: string,
    public lines?: string,
    public city?: string,
    public state?: string,
    public postalCode?: string,
    public country?: string,
    public phone?: string,
    public email?: string) {
  }

  identity(): string {
    return this.uniqueName;
  }


  getTypes(): any {
    return {
      uniqueName: String,
      name: String,
      locationName: String,
      contact: String,
      lines: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
      phone: String,
      email: String
    };
  }


  /**
   * Used by MetaUI to identify the name of the class once everything is minified
   */
  className(): string {
    return 'Supplier';
  }

  toString(): string {
    return this.name;
  }
}
