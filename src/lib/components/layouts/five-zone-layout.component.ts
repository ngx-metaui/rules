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
import {Component, HostBinding} from '@angular/core';

/**
 * We are using these components as a better way selectors.
 *
 */


/**
 * Common class used used for Five Zone layout. Used for the ng-content selector
 */
@Component({
    selector: 'aw-top',
    template: '<ng-content></ng-content>'
})
export class TopZoneComponent
{
    @HostBinding('class') classList: string = 'ui-g-12 ui-g-nopad ';
}

/**
 * Common class used used for Five Zone layout. Used for the ng-content selector
 */
@Component({
    selector: 'aw-left',
    template: '<ng-content></ng-content>'
})
export class LeftZoneComponent
{
    @HostBinding('class') classList: string = 'ui-g-12 ui-g-nopad';
}

/**
 * Common class used used for Five Zone layout. Used for the ng-content selector
 */
@Component({
    selector: 'aw-middle',
    template: '<ng-content></ng-content>'
})
export class MiddleZoneComponent
{
    @HostBinding('class') classList: string = 'ui-g-12 ui-md-6 ui-lg-4 ui-g-nopad';
}


/**
 * Common class used used for Five Zone layout. Used for the ng-content selector
 */
@Component({
    selector: 'aw-right',
    template: '<ng-content></ng-content>'
})
export class RightZoneComponent
{
    @HostBinding('class') classList: string = 'ui-g-12 ui-g-nopad';

}

/**
 * Common class used used for Five Zone layout. Used for the ng-content selector
 */
@Component({
    selector: 'aw-bottom',
    template: '<ng-content></ng-content>'
})
export class BottomZoneComponent
{
    @HostBinding('class') classList: string = 'ui-g-12 ui-g-nopad';
}
