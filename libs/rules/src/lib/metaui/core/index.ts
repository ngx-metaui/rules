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
 *
 */

export {MetaConfig} from './config/meta-config';
export {
  MetaContextComponent, MetaUIActionEvent
} from './meta-context/meta-context.component';
export {
  CompositeType, Deserializable, Entity, Identity, isEntity, isValue, Value
}from './utils/domain-model';
export {
  beautifyClassName,
  beautifyFileName,
  booleanValue,
  defaultLabelForIdentifier,
  objectEquals,
  toList
} from './utils/lang';
export {FieldPath} from './utils/field-path';
export {RoutingService, AppRoute} from './utils/routing.service';
export {ComponentRegistry} from './component-registry.service';
export {
  Activation, Assignment, AssignmentSnapshot, Context, DeferredAssignment, ObjectMetaContext,
  PropertyAccessor, Snapshot, StaticRec, UIContext
} from './context';
export {
  MetaRules, MetaRuleBase, LayoutRule, _DebugDoubleCheckMatches, _UsePartialIndexing, ActionZones,
  addTrait, addTraits, AppConfigRuleFilesParam, AppConfigUserRulesParam, ClassRulePriority,
  DeclRule, DefaultActionCategory, FieldPathNullMarker, KeyAction,
  KeyActionCategory, KeyAfter, KeyAny, KeyArea, KeyBindings, KeyClass, KeyComponentName, KeyDeclare,
  KeyEditable, KeyEditing, KeyElementType, KeyField, KeyHidden, KeyHomePage, KeyLabel, KeyLayout,
  KeyModule, KeyObject, KeyOperation, KeyRank, KeyTrait, KeyTraitGroup, KeyType, KeyValid, KeyValue,
  KeyVisible, KeyWrapperBinding, KeyWrapperComponent, KeyZonePath, LowRulePriority, MaxKeyDatas,
  META_RULES, ModuleActionZones, ModuleInfo, NullMarker, ObjectRule, overrideKeyForKey,
  PropActionCategories, PropActionsByCategory, PropFieldPropertyList, PropFieldsByZone,
  PropIsFieldsByZone, PropLayoutsByZone, RootPredecessorKey, ScopeKey, SystemRulePriority,
  UILibraryRulePriority, ValueQueriedObserver, ZoneBottom, ZoneDetail, ZoneLeft, ZoneMain,
  ZoneMiddle, ZoneRight, ZonesDetail, ZonesMTLRB, ZonesTLRMB, ZoneTop
} from './meta-rules';
export {Environment} from './config/environment';
export {ItemProperties} from './item-properties';
export {AWMetaCoreModule} from './meta-core.module';






