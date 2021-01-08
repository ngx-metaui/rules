import {Pipe, PipeTransform} from '@angular/core';
import {FieldPath} from './utils/field-path';
import {MetaContextComponent} from './meta-context/meta-context.component';

@Pipe({
  name: 'properties',
  pure: false
})
export class ContextPropertyPipe implements PipeTransform {

  transform(metaContext: MetaContextComponent, key: string, defaultValue?: any): any {
    if (key.includes('.')) {
      const fieldPath = key.split('.');

      // first needs to be evaluated
      const target = metaContext.context.propertyForKey(fieldPath[0]);
      return FieldPath.getFieldValue(target, fieldPath.slice(1).join('.')) || defaultValue;

    } else {
      return metaContext.context.propertyForKey(key) || defaultValue;
    }
  }
}
