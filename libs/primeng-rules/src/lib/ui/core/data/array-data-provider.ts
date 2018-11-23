/**
 *
 * @license
 * Copyright 2017 SAP Ariba
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
 *
 *
 */
import {DataProvider} from './datatype-registry.service';
import {isBlank, isPresent} from '../../core/utils/lang';
import {Observable, of as observableOf} from 'rxjs';
import {FieldPath} from '@ngx-metaui/rules';


/**
 * Default implementation for Arrays.
 */
export class ArrayDataProvider<T> extends DataProvider<T> {

  constructor(protected  values: Array<T>) {
    super();
    this.type = Array;

    this.offScreenData = this.values;
    this.dataChanges.next(this.values);
  }

  expectedCount(params?: Map<string, any>): number {
    return this.offScreenData.length;
  }

  dataForParams(params?: Map<string, any>): Array<T> {
    if (isBlank(params)) {
      return this.offScreenData;
    }
    let data = this.offScreenData;

    if (isPresent(params) && params.has('offset') && params.has('limit')) {
      const offset = params.get('offset');
      const limit = params.get('limit');

      if (data.length > (offset + limit)) {
        data = data.slice(offset, offset + limit);
      } else {
        data = data.slice(offset, data.length);
      }
    }

    if (params.has('orderby') && params.has('selector')) {
      this.sort(data, params.get('orderby'), params.get('selector'));
    }
    return data;
  }


  fetch(params: Map<string, any>): Observable<T[]> {
    return observableOf(this.dataForParams(params));
  }


  /**
   * Provides default implementation for sorting current dataset by one column / key
   *
   * for sortOrdering please see Datatable and its sortOrderingForNumber()
   *
   *      1  = ascending
   *      -1 = descending
   */
  private sort(arrayToSort: any[], key: string, sortOrder: number): void {
    arrayToSort.sort((data1: any, data2: any) => {
      const value1 = FieldPath.getFieldValue(data1, key);
      const value2 = FieldPath.getFieldValue(data2, key);
      let result = null;

      if (value1 == null && value2 != null) {
        result = -1;
      } else if (value1 != null && value2 == null) {
        result = 1;
      } else if (value1 == null && value2 == null) {
        result = 0;
      } else if (typeof value1 === 'string' && typeof value2 === 'string') {
        result = value1.localeCompare(value2);
      } else {
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
      }

      return (sortOrder * result);
    });
  }
}
