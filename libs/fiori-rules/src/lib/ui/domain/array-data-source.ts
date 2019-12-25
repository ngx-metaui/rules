/**
 *
 * @license
 * F. Kolar
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
/**
 * Default implementation for Arrays.
 */
import {ComboBoxDataSource, DataProvider} from './data-source';
import {Observable, of as observableOf} from 'rxjs';
import {isFunction, isJsObject, isPresent, objectToName, objectValues} from '../utils/lang';
import {coerceBooleanProperty} from '@angular/cdk/coercion';


export class ArrayComboBoxDataSource<T> extends ComboBoxDataSource<T> {

  constructor(private data: T[]) {
    super(new ArrayDataProvider(data));
  }
}


export class ArrayDataProvider<T> extends DataProvider<T> {


  constructor(protected  values: Array<T>) {
    super();
  }

  fetch(params: Map<string, any>): Observable<T[]> {

    const queryString = params.get('query');
    const fullText = params.has('fullText') ? params.get('fullText') : true;
    const limit = params.get('limit') || 50;

    if (!queryString || queryString === '*') {
      return observableOf(this.withLimit(this.values, limit));
    }
    const result: any[] = [];
    const toLowerPattern = queryString.toLowerCase();

    for (let i = 0; i < this.values.length; i++) {
      const item = this.values[i];
      if (this.matches(item, toLowerPattern, fullText)) {
        result.push(item);
        if (result.length >= limit) {
          break;
        }
      }
    }
    return observableOf(result);
  }


  /**
   *
   * Warning: If you dont supply search Key and you want fulltext search and you use this
   * default implementation be aware that it can  perform poorly as it is naive implementaion
   * that does not do deep compare.
   *
   */
  matches(item: T, pattern: string, fullText: boolean = true): boolean {
    let value = (isPresent(this._keyPath)) ? this._keyPath.getFieldValue(item) : item;

    if (isFunction(value)) {
      value = value.call(item);
    } else if (isJsObject(value)) {
      return this.hasObjectValue(item, pattern);
    } else if (fullText) {
      return (pattern && value) && value.toString().toLowerCase().indexOf(pattern) > -1;
    } else {
      return (pattern && value) && value.toString().toLowerCase() === pattern   ;
    }
  }

  protected hasObjectValue(obj: any, pattern: string): boolean {
    const values = objectValues(obj);
    const parentObj = objectToName(obj);
    const length2 = values.filter((value: any) => {
      if (!value || Array.isArray(value)) {
        return false;

      } else if (!isJsObject(value) && !isFunction(value)) {
        return value.toString().toLowerCase().indexOf(pattern) !== -1;

      } else if (isJsObject(value) && objectToName(value) !== parentObj) {
        return this.hasObjectValue(value, pattern);
      }

      return false;
    }).length;
    return length2 > 0;
  }


  private withLimit(data: Array<T>, limit?: number): Array<T> {
    if (limit && data.length > limit) {
      return data.slice(0, limit);
    }
    return data;
  }

}
