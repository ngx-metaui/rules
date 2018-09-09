/**
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
 * Based on original work: MetaUI: Craig Federighi (2008)
 *
 */
import { AfterViewInit, QueryList } from '@angular/core';
import { Environment } from '@aribaui/core';
import { MetaLayout } from '../meta-layout';
import { MetaContextComponent } from '../../core/meta-context/meta-context.component';
import { SectionComponent } from '@aribaui/components';
/**
 * MetaSection renders list of sections defined by @trait inside WidgetsRules. It uses layouts to
 * structure the list.
 *
 * ```
 *  layout {
 *       @trait=Sections { visible:true; component:MetaSectionsComponent }
 *  }
 *
 * ```
 *
 * and can be used as :
 *
 * ```
 *     layout=RfxDetailLayout#Sections {
 *
 *         @layout=Header#Form {
 *             trait:labelsOnTop;
 *             zonePath:Header;
 *
 *             bindings: {
 *                 description:$object.header.description;
 *             }
 *         }
 *         @layout=LineItems {
 *             component:RfxLineItemsComponent;
 *             bindings: {
 *                 rfxEvent:$object;
 *             }
 *         }
 *         @layout=Participants {
 *             component:RfxParticipantsComponent;
 *             bindings: {
 *                 rfxEvent:$object;
 *             }
 *         }
 *     }
 *
 *
 *     class=RfxEventHeader {
 *         zNone => *;
 *         Header.zLeft => requester => region => needBy;
 *     }
 * ```
 * In above example we have first section with Form where RfxEventHeader sends its fields
 * and several other sections with custom component.
 *
 *
 */
export declare class MetaSectionsComponent extends MetaLayout implements AfterViewInit {
    protected _metaContext: MetaContextComponent;
    env: Environment;
    /**
     * Collect list of sections that are rendered so we can use them later on when broadcasting
     * an event to application. In some case just like this you need to have a reference
     * to the component
     */
    viewSections: QueryList<SectionComponent>;
    /**
     * List of section read from QueryList after view is initialized
     */
    sections: SectionComponent[];
    sectionOperations: {
        [name: string]: string;
    };
    private onCompleteSubscriptions;
    constructor(_metaContext: MetaContextComponent, env: Environment);
    ngOnInit(): void;
    ngDoCheck(): void;
    ngAfterViewInit(): void;
    /**
     * Action handler to broadcast event outside so it can be handled by the application
     *
     */
    onAction(name: string, sectionIndex: number, cnxName: string, event: any): void;
    /**
     *
     * Retrieves a property from the current context
     *
     */
    sectionProp(propName: string, cnxName: string, defaultVal: any): any;
    ngOnDestroy(): void;
}
