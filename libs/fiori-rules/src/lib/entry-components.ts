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
 * WITHOUT WARRANTIES OR CONDITIONNS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 *
 */
/**
 * Used by Meta Renderer component in order to convert string to type.
 *
 *  `import * as entryComponents from './entry-components';`
 *
 *  Then iterate thru the content to register each TYPE that needs to be instantiated.
 */

/**
 * UI Input Components
 */

export {StringModule} from './ui/form/string/string.module';
export {MetaObjectMarkerModule} from './ui/object-marker/object-marker.module';
export {PlatformInputModule} from '@fundamental-ngx/platform';


/**
 * Containers
 */

export * from './metaui/meta-form/meta-form.module';
export * from './metaui/meta-dynamic-page/dynamic-page.module';
export * from './metaui/meta-element-list/element-list.module';
export * from './metaui/meta-breadcrumb/breadcrumb.module';
export * from './metaui/meta-toolbar-actions/meta-toolbar-actions.module';
export * from './metaui/meta-bar-actions/meta-bar-actions.module';

