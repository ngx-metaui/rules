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
export { AWMetaCoreModule } from './meta-core.module';
export { MetaContextComponent, ACTIVE_CNTX, MetaUIActionEvent } from './meta-context/meta-context.component';
export { Activation, Assignment, AssignmentSnapshot, Context, DeferredAssignment, ObjectMetaContext, PropertyAccessor, Snapshot, StaticRec, UIContext } from './context';
export { ItemProperties } from './item-properties';
export { JsonRule, SelectorJson } from './json-rule';
export { Match, MatchResult, MatchWithUnion, UnionMatchResult } from './match';
export { Meta, KeyValueCount, PropertyManager, OverrideValue, KeyData, PropertyMap, PropertyMergerIsChaining, PropertyMerger, PropertyMergerDynamic, PropertyMerger_Overwrite, PropertyMerger_List, PropertyMergerDeclareList, PropertyMergerDeclareListForTrait, PropertyMerger_And, PropertyMerger_Valid, RuleSet, MatchValue, ValueMatches, MultiMatchValue, ValueQueriedObserver, KeyValueTransformer, KeyValueTransformer_KeyPresent, PropertyMapAwaking, isPropertyMapAwaking } from './meta';
export { MapEntry, NestedMap } from './nested-map';
export { FieldTypeIntrospectionMetaProvider, IntrospectionMetaProvider, ObjectMeta, ObjectMetaPropertyMap, OMPropertyMerger_Valid } from './object-meta';
export { SystemPersistenceRules } from './persistence-rules';
export { DynamicPropertyValue, DynamicSettablePropertyValue, StaticallyResolvable, StaticDynamicWrapper, StaticallyResolvableWrapper, ContextFieldPath, isDynamicSettable, Expr, DeferredOperationChain, ValueConverter } from './property-value';
export { Rule, RuleWrapper, Selector } from './rule';
export { RuleLoader, RuleLoaderService } from './rule-loader.service';
export { LocalizedString, UIMeta, ModuleInfo } from './uimeta';
export { SystemRules } from './widgets-rules';
