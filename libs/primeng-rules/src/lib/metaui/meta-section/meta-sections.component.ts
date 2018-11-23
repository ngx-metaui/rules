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
import {AfterViewInit, Component, QueryList, ViewChildren} from '@angular/core';
import {
  Context,
  Environment,
  ItemProperties,
  MetaContextComponent,
  MetaLayout,
  MetaUIActionEvent
} from '@ngx-metaui/rules';
import {SectionComponent} from '../../ui/widgets';
import {isBlank, isPresent} from '../../ui/core/utils/lang';

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
@Component({
  templateUrl: 'meta-sections.component.html',
  styleUrls: ['meta-sections.component.scss']
})
export class MetaSectionsComponent extends MetaLayout implements AfterViewInit {
  /**
   * Collect list of sections that are rendered so we can use them later on when broadcasting
   * an event to application. In some case just like this you need to have a reference
   * to the component
   */
  @ViewChildren(SectionComponent)
  viewSections: QueryList<SectionComponent>;

  /**
   * List of section read from QueryList after view is initialized
   */
  sections: SectionComponent[];


  sectionOperations: { [name: string]: string } = {};


  private onCompleteSubscriptions: { [name: string]: SectionComponent } = {};


  constructor(protected _metaContext: MetaContextComponent, public env: Environment) {
    super(_metaContext, env);

  }


  ngOnInit(): void {
    super.ngOnInit();

    this.allLayouts.forEach((value: ItemProperties) => {
      this.sectionOperations[value.name] = 'view';
    });
  }

  ngDoCheck(): void {
    super.ngDoCheck();


  }

  ngAfterViewInit(): void {
    this.sections = [...this.viewSections.toArray()];
  }

  /**
   * Action handler to broadcast event outside so it can be handled by the application
   *
   */
  onAction(name: string, sectionIndex: number, cnxName: string, event: any): void {
    const section = this.sections[sectionIndex];
    if (this.env.hasValue('parent-cnx')) {
      const cnx: MetaContextComponent = this.env.getValue('parent-cnx');

      cnx.onAction.emit(new MetaUIActionEvent(section, name, cnxName,
        event));
    }

    if (name === 'onEdit' && section.editState && section.editMode === 'default') {
      this.sectionOperations[cnxName] = 'edit';

      if (isBlank(this.onCompleteSubscriptions[cnxName])) {
        section.onEditingComplete.subscribe((value: any) =>
          this.sectionOperations[cnxName] = 'view'
        );
        this.onCompleteSubscriptions[cnxName] = section;
      }

    }
  }


  /**
   *
   * Retrieves a property from the current context
   *
   */
  sectionProp(propName: string, cnxName: string, defaultVal: any): any {
    const lContext: Context = this.contextMap.get(cnxName);
    return (isPresent(lContext) && isPresent(lContext.propertyForKey(propName))) ?
      lContext.propertyForKey(propName) : defaultVal;
  }


  ngOnDestroy(): void {
    super.ngOnDestroy();

    this.allLayouts.forEach((value: ItemProperties) => {
      if (isPresent(this.onCompleteSubscriptions[value.name])) {
        this.onCompleteSubscriptions[value.name].onEditingComplete.unsubscribe();
      }
    });
  }
}
