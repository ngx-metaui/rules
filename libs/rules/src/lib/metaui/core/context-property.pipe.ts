import {Pipe, PipeTransform} from '@angular/core';
import {FieldPath} from './utils/field-path';
import {MetaContextComponent} from './meta-context/meta-context.component';
import {KeyObject} from './constants';
import {UIContext} from './context';

@Pipe({
  name: 'properties',
  pure: false
})
export class ContextPropertyPipe implements PipeTransform {

  transform(metaContext: MetaContextComponent, key: string, defaultValue?: any): any {
    if (key.includes('.')) {
      const fieldPath = key.split('.');

      return this._handleDottedPath(metaContext, fieldPath) || defaultValue;

    }
    if (key === KeyObject) {
      return (metaContext.context as UIContext).object;
    } else {
      const val = metaContext.context.propertyForKey(key);
      return ((typeof val === 'boolean' && val === false) ? false : (!val ? defaultValue : val));
    }
  }

  private _handleDottedPath(metaContext: MetaContextComponent, path: string[]): any {
    // first needs to be evaluated
    const target = metaContext.context.propertyForKey(path[0]);
    return FieldPath.getFieldValue(target, path.slice(1).join('.'));


  }
}




