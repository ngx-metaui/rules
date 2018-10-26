import {Entity} from '@ngx-metaui/rules';

/**
 * This is generated class
 */
export class <%= classify(modelClass) %> implements Entity {


  constructor(public uniqueName?: string, public name?: string,
              public description?: string, public created?: Date) {
  }

  identity(): string {
    return this.uniqueName;
  }


  getTypes(): any {
    return {
      uniqueName: String,
      name: Number,
      description: String,
      created: Date
    };
  }

  /**
   * Used by MetaUI to introspect fields even those that are not initialized. Will be removed in the next version
   * in favor of getTypes()
   *
   */
  $proto(): <%= classify(modelClass) %> {
    const obj = new <%= classify(modelClass) %>();
    obj.uniqueName = '6';
    obj.name = 's';
    obj.description = 's';
    obj.created = new Date();
    return obj;
  }


  /**
   * Used by MetaUI to identify the name of the class once everything is minified
   */
  className(): string {
    return '<%= classify(modelClass) %>';
  }


  toString(): string {
    return this.name;
  }
}
