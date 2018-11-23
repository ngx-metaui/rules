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
import {Component, DebugElement, Input} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {ContextFieldPath, Expr} from './property-value';
import {Match} from './match';
import {Entity} from '../core/utils/domain-model';
import {MetaUIRulesModule} from '../rules.module';
import {
  KeyAfter,
  KeyBindings,
  KeyComponentName,
  KeyEditable,
  KeyLabel,
  KeyType,
  KeyValid,
  KeyValue,
  KeyVisible,
  META_RULES,
  MetaRules,
  PropFieldsByZone,
  ZoneLeft
} from './meta-rules';
import {NestedMap} from './nested-map';
import {UIContext} from './context';

// @formatter:off
/* tslint:disable */
// temp rules to push some default that are now separated from the rule engine
export const UILibRules = {
  oss: [
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'StringComponent',
        'bindings': {
          'value': {
            't': 'CFP',
            'v': 'value'
          }
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': [
            'boolean',
            'Boolean'
          ],
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': [
            'boolean',
            'Boolean'
          ],
          '_isDecl': false
        },
        {
          '_key': 'editable',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'CheckboxComponent',
        'bindings': {
          'type': 'form'
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': [
            'boolean',
            'Boolean'
          ],
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'Number',
          '_isDecl': false
        }
      ],
      '_properties': {
        'bindings': {
          'formatter': {
            't': 'CFP',
            'v': 'formatters.integer'
          }
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'Number',
          '_isDecl': false
        },
        {
          '_key': 'editable',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'InputFieldComponent'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'Number',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'Number',
          '_isDecl': false
        },
        {
          '_key': 'operation',
          '_value': 'search',
          '_isDecl': false
        }
      ],
      '_properties': {
        'bindings': {
          'formatter': {
            't': 'CFP',
            'v': 'formatters.blankNull.integer'
          }
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'Number',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'Date',
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'DateAndTimeComponent',
        'bindings': {
          'formatter': 'shortDate',
          'showTime': false
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'Date',
          '_isDecl': false
        },
        {
          '_key': 'fiveZoneLayout',
          '_value': true,
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'Date',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'Date',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'dateTime',
          '_isDecl': true
        },
        {
          '_key': 'editable',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'bindings': {
          'formatter': 'dateTime',
          'showTime': true
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'Date',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'Enum',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'Enum',
          '_isDecl': false
        },
        {
          '_key': 'editable',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'GenericChooserComponent',
        'bindings': {
          'destinationClass': {
            't': 'Expr',
            'v': 'type'
          },
          'displayKey': 'name',
          'formatter': {
            't': 'CFP',
            'v': 'formatters.identifier'
          },
          'key': {
            't': 'Expr',
            'v': 'field'
          },
          'object': {
            't': 'Expr',
            'v': 'object'
          }
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'Enum',
          '_isDecl': false
        },
        {
          '_key': 'editable',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'operation',
          '_value': [
            'search',
            'list'
          ],
          '_isDecl': false
        }
      ],
      '_properties': {
        'bindings': {
          'type': 'Popup'
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'Enum',
          '_isDecl': false
        },
        {
          '_key': 'editable',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'Enum',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': [
            'Array',
            'Set'
          ],
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': [
            'Array',
            'Set'
          ],
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'enum',
          '_isDecl': true
        },
        {
          '_key': 'editable',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'GenericChooserComponent',
        'bindings': {
          'multiselect': true,
          'destinationClass': {
            't': 'Expr',
            'v': 'properties.get("enumClass")'
          },
          'displayKey': 'name',
          'formatter': {
            't': 'CFP',
            'v': 'formatters.identifier'
          },
          'key': {
            't': 'Expr',
            'v': 'field'
          },
          'object': {
            't': 'Expr',
            'v': 'object'
          }
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': [
            'Array',
            'Set'
          ],
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': [
            'Array',
            'Set'
          ],
          '_isDecl': false
        },
        {
          '_key': 'operation',
          '_value': [
            'search',
            'list'
          ],
          '_isDecl': false
        }
      ],
      '_properties': {
        'visible': false
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': [
            'Array',
            'Set'
          ],
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': [
            'Array',
            'Set'
          ],
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'ownedToMany',
          '_isDecl': true
        }
      ],
      '_properties': {
        'component': 'MetaDetailTable',
        'after': 'zDetail'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': [
            'Array',
            'Set'
          ],
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'File',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'File',
          '_isDecl': false
        },
        {
          '_key': 'editable',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'FileUploadChooser',
        'bindings': {
          'file': {
            't': 'CFP',
            'v': 'value'
          }
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'File',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'File',
          '_isDecl': false
        },
        {
          '_key': 'editable',
          '_value': false,
          '_isDecl': false
        }
      ],
      '_properties': {
        'bindings': {
          'value': {
            't': 'Expr',
            'v': 'value ? value.name : "(none)"'
          }
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'File',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'editable',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'InputFieldComponent'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'longtext',
          '_isDecl': true
        }
      ],
      '_properties': {
        'after': 'zBottom'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'longtext',
          '_isDecl': true
        },
        {
          '_key': 'editable',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'TextAreaComponent',
        'bindings': {
          'rows': 10,
          'cols': 60
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'longtext',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'longtext',
          '_isDecl': true
        },
        {
          '_key': 'operation',
          '_value': [
            'search',
            'list'
          ],
          '_isDecl': false
        }
      ],
      '_properties': {
        'visible': false
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'longtext',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'richtext',
          '_isDecl': true
        }
      ],
      '_properties': {
        'bindings': {
          'escapeUnsafeHtml': true
        },
        'after': 'zBottom'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'richtext',
          '_isDecl': true
        },
        {
          '_key': 'editable',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'RichTextAreaComponent',
        'bindings': {
          'rows': 10,
          'cols': 60
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'richtext',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'richtext',
          '_isDecl': true
        },
        {
          '_key': 'operation',
          '_value': 'search',
          '_isDecl': false
        }
      ],
      '_properties': {
        'after': 'zNone'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'richtext',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'richtext',
          '_isDecl': true
        },
        {
          '_key': 'operation',
          '_value': 'list',
          '_isDecl': false
        }
      ],
      '_properties': {
        'editable': false,
        'after': 'zDetail'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'richtext',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'secret',
          '_isDecl': true
        }
      ],
      '_properties': {
        'bindings': {
          'formatter': {
            't': 'CFP',
            'v': 'formatters.hiddenPassword'
          }
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'secret',
          '_isDecl': true
        },
        {
          '_key': 'editable',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'AWPasswordField',
        'bindings': {}
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'secret',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'secret',
          '_isDecl': true
        },
        {
          '_key': 'operation',
          '_value': [
            'search',
            'list'
          ],
          '_isDecl': false
        }
      ],
      '_properties': {
        'visible': false
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'secret',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'truncated',
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'TruncateString',
        'bindings': {
          'size': 10
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'String',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'type',
          '_value': 'Money',
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'CurrencyComponent',
        'bindings': {
          'money': {
            't': 'CFP',
            'v': 'value'
          },
          'currencies': {
            't': 'Expr',
            'v': 'properties.get("currencies")'
          }
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'derived',
          '_isDecl': true
        }
      ],
      '_properties': {
        'editable': false
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'derived',
          '_isDecl': true
        },
        {
          '_key': 'editing',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'after': 'zNone'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'derived',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'searchable',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'searchable',
          '_isDecl': true
        },
        {
          '_key': 'operation',
          '_value': 'search',
          '_isDecl': false
        }
      ],
      '_properties': {
        'visible': true,
        'editable': {
          't': 'OV',
          'v': 'true'
        },
        'after': {
          't': 'OV',
          'v': 'null'
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'searchable',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'required',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'required',
          '_isDecl': true
        },
        {
          '_key': 'operation',
          '_value': [
            'edit',
            'create'
          ],
          '_isDecl': false
        }
      ],
      '_properties': {
        'required': true
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'required',
          '_isDecl': true
        },
        {
          '_key': 'operation',
          '_value': [
            'edit',
            'create'
          ],
          '_isDecl': false
        },
        {
          '_key': 'object',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'valid': {
          't': 'Expr',
          'v': '((value != undefined) && (value != null)) ? true : "Answer required"'
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'required',
          '_isDecl': true
        },
        {
          '_key': 'operation',
          '_value': [
            'edit',
            'create'
          ],
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'required',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'list',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'list',
          '_isDecl': true
        },
        {
          '_key': 'editable',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'GenericChooserComponent',
        'bindings': {
          'list': {
            't': 'Expr',
            'v': 'properties.get("choices")'
          },
          'type': {
            't': 'Expr',
            'v': 'properties.get("chooserStyle")'
          },
          'key': {
            't': 'Expr',
            'v': 'properties.get("field")'
          },
          'object': {
            't': 'Expr',
            'v': 'object'
          }
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'list',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'asObject',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'asObject',
          '_isDecl': true
        },
        {
          '_key': 'editable',
          '_value': false,
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'MetaObjectDetailComponent',
        'nestedLayout': true,
        'bindings': {
          'layout': 'Inspect',
          'useNoLabelLayout': true,
          'label': {
            't': 'Expr',
            'v': 'properties.get("label")'
          },
          'object': {
            't': 'CFP',
            'v': 'value'
          }
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'asObject',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'asHover',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'asHover',
          '_isDecl': true
        },
        {
          '_key': 'editable',
          '_value': false,
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'HoverCardComponent',
        'bindings': {
          'linkTitle': {
            't': 'CFP',
            'v': 'value'
          },
          'appendContentToBody': false,
          'ngcontentLayout': 'Content'
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'asHover',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'layout',
          '_value': 'Content',
          '_isDecl': true
        }
      ],
      '_properties': {
        'component': 'MetaObjectDetailComponent',
        'bindings': {
          'layout': 'Inspect',
          'object': {
            't': 'CFP',
            'v': 'value'
          }
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'noCreate',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'noCreate',
          '_isDecl': true
        },
        {
          '_key': 'operation',
          '_value': 'create',
          '_isDecl': false
        }
      ],
      '_properties': {
        'visible': false
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'noCreate',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'noSearch',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'noSearch',
          '_isDecl': true
        },
        {
          '_key': 'operation',
          '_value': 'search',
          '_isDecl': false
        }
      ],
      '_properties': {
        'visible': false
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'noSearch',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': 'GenericChooserComponent',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': 'GenericChooserComponent',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'Popup',
          '_isDecl': true
        }
      ],
      '_properties': {
        'bindings': {
          'type': 'Dropdown'
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': 'GenericChooserComponent',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': 'GenericChooserComponent',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'PopupControl',
          '_isDecl': true
        }
      ],
      '_properties': {
        'bindings': {
          'type': 'PopupControl'
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': 'GenericChooserComponent',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': 'GenericChooserComponent',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'Chooser',
          '_isDecl': true
        }
      ],
      '_properties': {
        'bindings': {
          'type': 'Chooser'
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': 'GenericChooserComponent',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': 'GenericChooserComponent',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'PostOnChange',
          '_isDecl': true
        }
      ],
      '_properties': {
        'bindings': {}
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': 'GenericChooserComponent',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': [
            'StringComponent',
            'AWHyperlink',
            'PopupMenuLink'
          ],
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': [
            'StringComponent',
            'AWHyperlink',
            'PopupMenuLink'
          ],
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'bold',
          '_isDecl': true
        }
      ],
      '_properties': {
        'wrapperComponent': 'GenericContainerComponent',
        'wrapperBindings': {
          'tagName': 'b'
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': [
            'StringComponent',
            'AWHyperlink',
            'PopupMenuLink'
          ],
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': [
            'StringComponent',
            'AWHyperlink',
            'PopupMenuLink'
          ],
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'italic',
          '_isDecl': true
        }
      ],
      '_properties': {
        'wrapperComponent': 'GenericContainerComponent',
        'wrapperBindings': {
          'tagName': 'i'
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': [
            'StringComponent',
            'AWHyperlink',
            'PopupMenuLink'
          ],
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': [
            'StringComponent',
            'AWHyperlink',
            'PopupMenuLink'
          ],
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'heading1',
          '_isDecl': true
        }
      ],
      '_properties': {
        'wrapperComponent': 'GenericContainerComponent',
        'wrapperBindings': {
          'tagName': 'h1'
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': [
            'StringComponent',
            'AWHyperlink',
            'PopupMenuLink'
          ],
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': [
            'StringComponent',
            'AWHyperlink',
            'PopupMenuLink'
          ],
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'heading2',
          '_isDecl': true
        }
      ],
      '_properties': {
        'wrapperComponent': 'GenericContainerComponent',
        'wrapperBindings': {
          'tagName': 'h2'
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': [
            'StringComponent',
            'AWHyperlink',
            'PopupMenuLink'
          ],
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': [
            'StringComponent',
            'AWHyperlink',
            'PopupMenuLink'
          ],
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'heading3',
          '_isDecl': true
        }
      ],
      '_properties': {
        'wrapperComponent': 'GenericContainerComponent',
        'wrapperBindings': {
          'tagName': 'h3'
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': [
            'StringComponent',
            'AWHyperlink',
            'PopupMenuLink'
          ],
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'field',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'ActionButtons',
          '_isDecl': true
        }
      ],
      '_properties': {
        'component': 'MetaActionListComponent',
        'visible': true,
        'bindings': {
          'defaultStyle': 'primary',
          'renderAs': 'buttons',
          'align': 'right'
        },
        'elementClass': 'l-action-buttons'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'ActionLinks',
          '_isDecl': true
        }
      ],
      '_properties': {
        'component': 'MetaActionListComponent',
        'visible': true,
        'bindings': {
          'renderAs': 'links',
          'align': 'none'
        },
        'elementClass': 'l-action-buttons'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'ActionLinksAligned',
          '_isDecl': true
        }
      ],
      '_properties': {
        'component': 'MetaActionListComponent',
        'visible': true,
        'bindings': {
          'renderAs': 'links',
          'align': 'right'
        },
        'elementClass': 'l-action-buttons'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'ActionMenu',
          '_isDecl': true
        }
      ],
      '_properties': {
        'component': 'MetaActionListComponent',
        'visible': true,
        'bindings': {
          'renderAs': 'menu',
          'align': 'right'
        },
        'elementClass': 'l-action-buttons'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'InstanceActionButtons',
          '_isDecl': true
        }
      ],
      '_properties': {
        'component': 'MetaActionListComponent',
        'visible': true,
        'bindings': {
          'filterActions': 'instance',
          'renderAs': 'buttons',
          'align': 'right'
        },
        'elementClass': 'l-action-buttons'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'StaticActionButtons',
          '_isDecl': true
        }
      ],
      '_properties': {
        'component': 'MetaActionListComponent',
        'visible': true,
        'bindings': {
          'filterActions': 'static',
          'renderAs': 'buttons',
          'align': 'right'
        },
        'elementClass': 'l-action-buttons'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'Tabs',
          '_isDecl': true
        }
      ],
      '_properties': {
        'component': 'MetaTabs',
        'visible': true
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'Sections',
          '_isDecl': true
        }
      ],
      '_properties': {
        'component': 'MetaSectionsComponent',
        'visible': true
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'Form',
          '_isDecl': true
        }
      ],
      '_properties': {
        'component': 'MetaFormComponent',
        'visible': true
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'Stack',
          '_isDecl': true
        }
      ],
      '_properties': {
        'component': 'MetaElementListComponent',
        'visible': true
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'component',
          '_value': 'MetaFormComponent',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'labelsOnTop',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'class',
          '_value': {},
          '_isDecl': false
        },
        {
          '_key': 'layout',
          '_value': [
            'Inspect',
            'SearchForm'
          ],
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'StringComponent',
        'bindings': {}
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'layout',
          '_value': 'ListItem',
          '_isDecl': false
        },
        {
          '_key': 'class',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'StringComponent',
        'bindings': {
          'value': {
            't': 'Expr',
            'v': 'properties.get("objectTitle")'
          }
        }
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'module',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'pageBindings': {
          't': 'Expr',
          'v': '(properties.get("homePage") == "MetaHomePageComponent") ? new Map().set("module", values.get("module")) : null'
        },
        'component': 'MetaDashboardLayoutComponent',
        'visible': {
          't': 'SDW',
          'v': '!properties.get("hidden")'
        },
        'homePage': 'MetaHomePageComponent'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'module',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'layout',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_properties': {
        'visible': true
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'module',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'module',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'ActionTOC',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'module',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'ActionTOC',
          '_isDecl': true
        },
        {
          '_key': 'layout',
          '_value': 'Actions',
          '_isDecl': true
        }
      ],
      '_properties': {
        'component': 'MetaActionListComponent',
        'label': 'Actions',
        'after': 'zToc'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'module',
          '_value': '*',
          '_isDecl': false
        },
        {
          '_key': 'trait',
          '_value': 'ActionTOC',
          '_isDecl': true
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'module',
          '_value': '*',
          '_isDecl': false
        }
      ],
      '_rank': 0
    }
  ]
};

// @formatter:on
/* tslint:disable */


describe('Meta Context behaivor ', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestContainerComponent, SFComponent
      ],
      imports: [
        MetaUIRulesModule.forRoot({'env.test': true})
      ]
    });

    TestBed.compileComponents();
    const metaUI: MetaRules = TestBed.get(META_RULES);

    metaUI.loadUILibSystemRuleFiles({}, UILibRules, {});
  });


  describe('how Context Nested map work ', () => {

    it('it should instantiate and retrieve entries with out any runtime error and in the ' +
      'correct order ', () => {


        const xx = new Map<string, any>();
        xx.set('a', ' this is value a');
        xx.set('b', ' this is value b');
        xx.set('c', ' this is value c');


        const nestedMap = new NestedMap<string, any>(xx);

        const expectedOrder = ['a', 'b', 'c'];
        nestedMap.forEach((v, k) => {
          const key = expectedOrder.shift();
          expect(k).toEqual(key);

        });

      }
    );


    it(' it should instantiate and retrieve nested and parent entries in specified order ',
      () => {

        const xx = new Map<string, any>();
        xx.set('a', ' this is value a');
        xx.set('b', ' this is value b');
        xx.set('c', ' this is value c');


        const child = new Map<string, any>();
        child.set('a1', ' this is value a');
        child.set('b1', ' this is value b');
        child.set('c1', ' this is value c');


        const nestedMap = new NestedMap<string, any>(xx, child);

        const expectedOrder = ['a1', 'b1', 'c1', 'a', 'b', 'c'];
        nestedMap.forEach((v, k) => {
          const key = expectedOrder.shift();
          expect(k).toEqual(key);

        });
      }
    );

  });

  describe('Context Layout representing context assignments  ', () => {

    it('It should retrieve Default Empty context with preset letiables ', () => {
        const metaUI: MetaRules = TestBed.get(META_RULES);

        const context = metaUI.newContext();

        expect(context.meta).toBeDefined();

        expect(context.values).toBeDefined();
        expect(context.values.size).toEqual(0);

        expect(context._entries).toBeDefined();
        expect(context._entries.length).toEqual(0);

        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(0);

        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(0);

        expect(context._accessor).toBeDefined();

        expect(context.recPool).toBeDefined();
        expect(context.recPool.length).toEqual(0);

        expect(context.currentActivation).toBeDefined();
        expect(context.currentActivation._recs.length).toEqual(0);


      }
    );


    it('it should keep consistent push/pop frames so when we push for 1st time we expect 1 ' +
      'record size of 1 and ' + 'after we pop zero ', () => {

        const metaUI: MetaRules = TestBed.get(META_RULES);

        const context = metaUI.newContext();

        context.push();
        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(1);
        expect(context.frameStarts[0]).toEqual(0);


        context.pop();
        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(0);
      }
    );


    it('it should keep consistent push/pop frames so when we push for N-times time we ' +
      'expect correct framestarts records size as well as internal numbers ', () => {

        const metaUI: MetaRules = TestBed.get(META_RULES);

        const context = metaUI.newContext();

        context.push();
        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(1);
        expect(context.frameStarts[0]).toEqual(0);

        context.set('aaa', 'valueaaa ');
        context.set('bbbb', 'valuebbb ');
        context.set('cccc', 'valueccc ');

        context.push();
        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(2);
        expect(context.frameStarts[1]).toEqual(3);

        context.set('dddd', 'valueddd ');
        context.set('eeee', 'valueee');

        context.push();
        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(3);
        expect(context.frameStarts[2]).toEqual(5);

        context.set('zzz', 'valuezzz');


        context.pop();

        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(2);
        expect(context.frameStarts[1]).toEqual(3);


        context.pop();
        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(1);
        expect(context.frameStarts[0]).toEqual(0);

        context.pop();
        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(0);
      }
    );


    it('it should retrive default exaclty for basic when no user rules are loaded  and no ' +
      'class is specified after we push layout=Inspect', () => {

        const metaUI: MetaRules = TestBed.get(META_RULES);

        const context = metaUI.newContext();

        context.push();
        context.set('layout', 'Inspect');


        const propertyMap = context.allProperties();


        expect(propertyMap.size).toEqual(5);
        expect(propertyMap.has('label')).toBeTruthy();
        expect(propertyMap.has('zones')).toBeTruthy();
        expect(propertyMap.has('bindings')).toBeTruthy();
        expect(propertyMap.has('component')).toBeTruthy();
        expect(propertyMap.has('bindings')).toBeTruthy();
        expect(propertyMap.get('component')).toEqual('StringComponent');

        context.pop();
      }
    );

    it(' It should retrieve  property map when user rules are not loaded, after we push ' +
      'layout=Inspect and operation. It must retrive editing = true mode', () => {

        const metaUI: MetaRules = TestBed.get(META_RULES);

        const context = metaUI.newContext();

        context.push();
        context.set('layout', 'Inspect');
        context.set('operation', 'edit');


        const propertyMap = context.allProperties();


        expect(propertyMap.size).toEqual(6);
        expect(propertyMap.has('label')).toBeTruthy();
        expect(propertyMap.has('zones')).toBeTruthy();
        expect(propertyMap.has('editing')).toBeTruthy();
        expect(propertyMap.get('editing')).toEqual(true);
        expect(propertyMap.has('bindings')).toBeTruthy();
        expect(propertyMap.has('component')).toBeTruthy();
        expect(propertyMap.has('bindings')).toBeTruthy();
        expect(propertyMap.get('component')).toEqual('StringComponent');

        context.pop();
      }
    );


    it(' It should retrieve  property, after we push layout=Inspect and operation=view. ' +
      'we expect editing false in properties', () => {

        const metaUI: MetaRules = TestBed.get(META_RULES);

        const context = metaUI.newContext();

        context.push();
        context.set('layout', 'Inspect');
        context.set('operation', 'view');

        const propertyMap = context.allProperties();

        expect(propertyMap.size).toEqual(6);
        expect(propertyMap.has('label')).toBeTruthy();
        expect(propertyMap.has('zones')).toBeTruthy();
        expect(propertyMap.has('editing')).toBeTruthy();
        expect(propertyMap.get('editing')).toBeFalsy();
        expect(propertyMap.has('bindings')).toBeTruthy();
        expect(propertyMap.has('component')).toBeTruthy();
        expect(propertyMap.has('bindings')).toBeTruthy();
        expect(propertyMap.get('component')).toEqual('StringComponent');

        context.pop();
      }
    );

  });


  describe('basic context functionality regarding consistency of pushed stack and simple layout' +
    ' evaluation', () => {


    it(' It should retrieve Default Empty context with preset letiables ', () => {
        const metaUI: MetaRules = TestBed.get(META_RULES);

        const context = metaUI.newContext();

        expect(context.meta).toBeDefined();

        expect(context.values).toBeDefined();
        expect(context.values.size).toEqual(0);

        expect(context._entries).toBeDefined();
        expect(context._entries.length).toEqual(0);

        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(0);

        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(0);

        expect(context._accessor).toBeDefined();

        expect(context.recPool).toBeDefined();
        expect(context.recPool.length).toEqual(0);

        expect(context.currentActivation).toBeDefined();
        expect(context.currentActivation._recs.length).toEqual(0);


      }
    );


    it(' It should keep consistent push/pop frames so when we push for 1st time we expect 1 ' +
      'record size of 1 and after we pop zero ', () => {

        const metaUI: MetaRules = TestBed.get(META_RULES);

        const context = metaUI.newContext();

        context.push();
        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(1);
        expect(context.frameStarts[0]).toEqual(0);


        context.pop();
        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(0);
      }
    );


    it(' It should keep consistent push/pop frames so when we push for N-times time we ' +
      'expect correct framestarts records size as well as internal numbers ', () => {

        const metaUI: MetaRules = TestBed.get(META_RULES);

        const context = metaUI.newContext();

        context.push();
        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(1);
        expect(context.frameStarts[0]).toEqual(0);

        context.set('aaa', 'valueaaa ');
        context.set('bbbb', 'valuebbb ');
        context.set('cccc', 'valueccc ');

        context.push();
        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(2);
        expect(context.frameStarts[1]).toEqual(3);

        context.set('dddd', 'valueddd ');
        context.set('eeee', 'valueee');

        context.push();
        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(3);
        expect(context.frameStarts[2]).toEqual(5);

        context.set('zzz', 'valuezzz');


        context.pop();

        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(2);
        expect(context.frameStarts[1]).toEqual(3);


        context.pop();
        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(1);
        expect(context.frameStarts[0]).toEqual(0);

        context.pop();
        expect(context.frameStarts).toBeDefined();
        expect(context.frameStarts.length).toEqual(0);
      }
    );


    it(' It should retrive default exaclty for basic when no user rules are loaded  and no ' +
      'class is specified after we push layout=Inspect', () => {

        const metaUI: MetaRules = TestBed.get(META_RULES);

        const context = metaUI.newContext();

        context.push();
        context.set('layout', 'Inspect');


        const propertyMap = context.allProperties();

        expect(propertyMap.size).toEqual(5);
        expect(propertyMap.has('label')).toBeTruthy();
        expect(propertyMap.has('zones')).toBeTruthy();
        expect(propertyMap.has('bindings')).toBeTruthy();
        expect(propertyMap.has('component')).toBeTruthy();
        expect(propertyMap.has('bindings')).toBeTruthy();
        expect(propertyMap.get('component')).toEqual('StringComponent');

        context.pop();
      }
    );

    it(' It should retrieve  property map when user rules are not loaded, after we push ' +
      'layout=Inspect and operation. It must retrive editing = true mode', () => {

        const metaUI: MetaRules = TestBed.get(META_RULES);

        const context = metaUI.newContext();

        context.push();
        context.set('layout', 'Inspect');
        context.set('operation', 'edit');


        const propertyMap = context.allProperties();


        expect(propertyMap.size).toEqual(6);
        expect(propertyMap.has('label')).toBeTruthy();
        expect(propertyMap.has('zones')).toBeTruthy();
        expect(propertyMap.has('editing')).toBeTruthy();
        expect(propertyMap.get('editing')).toEqual(true);
        expect(propertyMap.has('bindings')).toBeTruthy();
        expect(propertyMap.has('component')).toBeTruthy();
        expect(propertyMap.has('bindings')).toBeTruthy();
        expect(propertyMap.get('component')).toEqual('StringComponent');

        context.pop();
      }
    );


    it(' It should retrieve  property map after we push layout=Inspect ' +
      'and operation=view. we expect editing false in properties', () => {

        const metaUI: MetaRules = TestBed.get(META_RULES);
        const context = metaUI.newContext();

        context.push();
        context.set('layout', 'Inspect');
        context.set('operation', 'view');

        const propertyMap = context.allProperties();

        expect(propertyMap.size).toEqual(6);
        expect(propertyMap.has('label')).toBeTruthy();
        expect(propertyMap.has('zones')).toBeTruthy();
        expect(propertyMap.has('editing')).toBeTruthy();
        expect(propertyMap.get('editing')).toBeFalsy();
        expect(propertyMap.has('bindings')).toBeTruthy();
        expect(propertyMap.has('component')).toBeTruthy();
        expect(propertyMap.has('bindings')).toBeTruthy();
        expect(propertyMap.get('component')).toEqual('StringComponent');

        context.pop();
      }
    );


  });


  describe('push/pop Meta Context behavior when Object is present and set', () => {


    it('It should retrieve correct Form Component  a MetaForm with fiveZones trait to render ' +
      'all the fields ', () => {
        const metaUI: MetaRules = TestBed.get(META_RULES);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const context = metaUI.newContext();
        context.push();

        context.set('layout', 'Inspect');
        context.set('operation', 'edit');
        context.set('object',
          new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic'));
        const props = context.allProperties();
        context.pop();


        expect(props.has('label')).toBeTruthy();
        expect(props.has('objectTitle')).toBeTruthy();
        expect(props.get('class_trait')).toEqual('fiveZones');
        expect(props.get('component')).toEqual('MetaFormComponent');
      }
    );

    it(' It should switch into different layout component (MetaElementList) in case we push ' +
      'Stack trait ', () => {
        const metaUI: MetaRules = TestBed.get(META_RULES);
        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const context = metaUI.newContext();
        context.push();

        context.set('layout', 'Inspect');
        context.set('trait', 'Stack');
        context.set('operation', 'edit');
        context.set('object',
          new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic'));
        const props = context.allProperties();

        // props.forEach((v , k) =>
        // {
        //     print(k + ' = = ' + v);
        // });
        //

        context.pop();

        expect(props.has('label')).toBeTruthy();
        expect(props.has('objectTitle')).toBeTruthy();
        expect(props.get('class_trait')).toEqual('fiveZones');
        expect(props.get('component')).toEqual('MetaElementListComponent');
      }
    );

    it('It should change layout to tableZone trait in case I push operation list so that it ' +
      'will have  6 zone layout ', () => {

        const metaUI: MetaRules = TestBed.get(META_RULES);
        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const context = metaUI.newContext();
        context.push();

        context.set('layout', 'Inspect');
        context.set('operation', 'list');
        context.set('object', new MyUserTestClass('Frank', 'Kolar', 16,
          'From Czech Republic'));
        const props = context.allProperties();

        // props.forEach((v , k) =>
        // {
        //     print(k + ' = ' + v);
        // });

        context.pop();

        expect(props.has('label')).toBeTruthy();
        expect(props.has('objectTitle')).toBeTruthy();
        expect(props.get('class_trait')).toEqual('tableZones');
        expect(props.get('component')).toEqual('MetaFormComponent');
      }
    );


    it('field: It should retrieve correct component type => TextField for firstName when in ' +
      'editing mode', () => {

        const metaUI: MetaRules = TestBed.get(META_RULES);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const context = metaUI.newContext();
        context.push();

        context.set('layout', 'Inspect');
        context.set('operation', 'edit');
        context.set('object',
          new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic'));
        context.setScopeKey('class');


        context.set('field', 'firstName');

        const props = context.allProperties();

        const componentName = context.propertyForKey(KeyComponentName);


        expect(componentName).toEqual('InputFieldComponent');
        expect(context.propertyForKey('layout_trait')).toEqual('Form');
        expect(context.propertyForKey(KeyEditable)).toEqual(true);
        context.pop();
      }
    );


    it('field: It should have correct class trait, editability to false as well as change ' +
      'component to String if we change operation from Edit to list ', () => {

        const metaUI: MetaRules = TestBed.get(META_RULES);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const context = metaUI.newContext();
        context.push();

        context.set('layout', 'Inspect');
        context.set('operation', 'list');
        context.set('object', new MyUserTestClass('Frank', 'Kolar', 16,
          'From Czech Republic'));
        context.setScopeKey('class');


        context.set('field', 'firstName');

        const props = context.allProperties();

        const componentName = context.propertyForKey(KeyComponentName);

        // print(componentName);

        expect(componentName).toEqual('StringComponent');
        expect(context.propertyForKey('layout_trait')).toEqual('Form');
        expect(context.propertyForKey(KeyEditable)).toEqual(false);
        context.pop();
      }
    );


    it('It should change component name from TextField to StringComponent when in View mode',
      () => {

        const metaUI: MetaRules = TestBed.get(META_RULES);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const context = metaUI.newContext();
        context.push();

        context.set('layout', 'Inspect');
        context.set('operation', 'view');
        context.set('object',
          new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic'));
        context.setScopeKey('class');


        context.set('field', 'firstName');

        const props = context.allProperties();

        const componentName = context.propertyForKey(KeyComponentName);

        // print(componentName);

        expect(componentName).toEqual('StringComponent');
        expect(context.propertyForKey('layout_trait')).toEqual('Form');
        expect(context.propertyForKey(KeyEditable)).toEqual(false);
        context.pop();
      }
    );


    it('It should retrieve a label My First Name specified in the rules', () => {

        const metaUI: MetaRules = TestBed.get(META_RULES);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const context = metaUI.newContext();
        context.push();

        context.set('layout', 'Inspect');
        context.set('operation', 'view');
        context.set('object', new MyUserTestClass('Frank', 'Kolar', 16,
          'From Czech Republic'));
        context.setScopeKey('class');


        context.set('field', 'firstName');

        const props = context.allProperties();

        const label = context.propertyForKey(KeyLabel);

        expect(label).toEqual('My First Name');
        context.pop();
      }
    );

    it(' firstName should be required as specified in the rule', () => {

        const metaUI: MetaRules = TestBed.get(META_RULES);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const context = metaUI.newContext();
        context.push();

        context.set('layout', 'Inspect');
        context.set('operation', 'view');

        context.set('object', new MyUserTestClass('Frank', 'Kolar', 16,
          'From Czech Republicc'));
        context.setScopeKey('class');


        context.set('field', 'firstName');

        const props = context.allProperties();

        //
        // props.forEach((v , k) =>
        // {
        //     print(k + ' = ' + v);
        // });
        //
        expect(context.propertyForKey('field_trait')).toBeTruthy();
        context.pop();
      }
    );


    it(' it should layout fields in their rank order so that firstName => lastName ' +
      '=> age => bio ', () => {

        const metaUI: MetaRules = TestBed.get(META_RULES);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const context = metaUI.newContext();
        context.push();

        context.set('layout', 'Inspect');
        context.set('operation', 'view');
        context.set('object',
          new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic'));
        context.setScopeKey('class');


        context.push();
        context.set('field', 'firstName');
        expect(context.propertyForKey(KeyAfter)).toEqual(ZoneLeft);
        context.pop();

        context.push();
        context.set('field', 'lastName');
        expect(context.propertyForKey(KeyAfter)).toEqual('firstName');
        context.pop();

        context.push();
        context.set('field', 'age');
        expect(context.propertyForKey(KeyAfter)).toEqual('lastName');
        context.pop();

        context.push();
        context.set('field', 'bio');
        expect(context.propertyForKey(KeyAfter)).toEqual('age');
        context.pop();


        context.pop();
      }
    );


    it('it should retrive correct component for field Age whcih is a number and it will be ' +
      'rendered as a numer', () => {

        const metaUI: MetaRules = TestBed.get(META_RULES);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const context = metaUI.newContext();
        context.push();

        context.set('layout', 'Inspect');
        context.set('operation', 'edit');
        context.set('object',
          new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic'));
        context.setScopeKey('class');


        context.push();
        context.set('field', 'age');

        expect(context.propertyForKey(KeyComponentName))
          .toEqual('InputFieldComponent');

        const type = context.propertyForKey(KeyType);
        expect(type).toEqual('Number');


        context.pop();
        context.pop();
      }
    );


    it('it should render field age which is a number in view only mode as a StringComponent',
      () => {

        const metaUI: MetaRules = TestBed.get(META_RULES);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const context = metaUI.newContext();
        context.push();

        context.set('layout', 'Inspect');
        context.set('operation', 'view');
        context.set('object',
          new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic'));
        context.setScopeKey('class');


        context.push();
        context.set('field', 'age');
        expect(context.propertyForKey(KeyComponentName)).toEqual('StringComponent');
        context.pop();

        context.pop();
      }
    );


    it('it should render a label for field age as a My age', () => {

        const metaUI: MetaRules = TestBed.get(META_RULES);
        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const context = metaUI.newContext();
        context.push();

        context.set('layout', 'Inspect');
        context.set('operation', 'view');
        context.set('object', new MyUserTestClass('Frank', 'Kolar', 16,
          'From Czech Republic'));
        context.setScopeKey('class');


        context.push();
        context.set('field', 'age');
        expect(context.propertyForKey(KeyLabel)).toEqual('My Age');
        context.pop();

        context.pop();
      }
    );


    it('age field should have a validity condition ', () => {

        const metaUI: MetaRules = TestBed.get(META_RULES);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const context = metaUI.newContext();
        context.push();

        context.set('layout', 'Inspect');
        context.set('operation', 'view');
        context.set('object', new MyUserTestClass('Frank', 'Kolar', 16,
          'From Czech Republic'));
        context.setScopeKey('class');


        context.push();
        context.set('field', 'age');

        // I do not want to resolve it right away, therefore using directly propertyMap
        const validity = context.allProperties().get(KeyValid);
        expect(validity instanceof Expr).toBeTruthy();
        context.pop();

        context.pop();
      }
    );


    it('age bio should have a visibility condition ', () => {

        const metaUI: MetaRules = TestBed.get(META_RULES);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const context = metaUI.newContext();
        context.push();

        context.set('layout', 'Inspect');
        context.set('operation', 'view');
        context.set('object', new MyUserTestClass('Frank', 'Kolar', 16,
          'From Czech Republic'));
        context.setScopeKey('class');


        context.push();
        context.set('field', 'bio');

        // visibilty is deffered value so we need to access directly the expression
        const visibility = context.allProperties().get(KeyVisible);
        // print('XXXXX:' + visibility);
        expect(visibility._override instanceof Expr).toBeTruthy();
        context.pop();

        context.pop();
      }
    );


    // Safari issue
    it('it should render correct value when switching operation from edit to view', () => {
        const metaUI: MetaRules = TestBed.get(META_RULES);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const ob = new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic');
        const context = metaUI.newContext();
        context.push();

        context.set('layout', 'Inspect');
        context.set('operation', 'edit');
        context.set('object', ob);
        context.setScopeKey('class');

        let fields = context.propertyForKey('fieldsByZone');
        // console.log(' fields -----')
        // fields.forEach((v, k) => {
        //     console.log(k + ' = ' + v);
        //
        // });

        // context.pop();

        expect(fields.has('zLeft')).toBeTruthy();
        expect(fields.get('zLeft').length).toEqual(4);


        const context2 = metaUI.newContext();
        context2.push();

        context2.set('layout', 'Inspect');
        context2.set('operation', 'view');
        context2.set('object', ob);
        context2.setScopeKey('class');

        fields = context2.propertyForKey('fieldsByZone');
        // console.log(' fields -----')
        // fields.forEach((v, k) => {
        //     console.log(k + ' = ' + v);
        //
        // });

        // context2.pop();
        expect(fields.has('zLeft')).toBeTruthy();
        expect(fields.get('zLeft').length).toEqual(4);

      }
    );
  });


  // @formatter:on
  describe(
    'layout based behavior with neested selectors such as operation=create, view and check ' +
    'how the ' +
    'structure and content can be changed so that we can e.g. hide show certain fields per ' +
    'operation or overide ' +
    'existing properties for for different situations.  ', () => {


      it('it should change the label of the age field when switching from editable mode to ' +
        'ready only mode', () => {

          const metaUI: MetaRules = TestBed.get(META_RULES);

          metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClas2sRule);
          const context = metaUI.newContext();


          context.push();
          context.set('layout', 'Inspect');
          context.set('operation', 'edit');
          context.set('object',
            new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic'));
          context.setScopeKey('class');


          context.push();
          context.set('field', 'age');
          expect(context.propertyForKey(KeyLabel)).toEqual('My Age');

          context.push();
          context.set('operation', 'view');
          expect(context.propertyForKey(KeyLabel)).toEqual('Age Label For View');
          context.pop();

          context.pop();


          context.pop();
        }
      );


      it('it should change the label of the firstName field when switching from editable ' +
        'mode to create  mode', () => {

          const metaUI: MetaRules = TestBed.get(META_RULES);

          metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClas2sRule);
          const context = metaUI.newContext();


          context.push();
          context.set('layout', 'Inspect');
          context.set('operation', 'edit');
          context.set('object',
            new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic'));
          context.setScopeKey('class');


          context.push();
          context.set('field', 'firstName');
          expect(context.propertyForKey(KeyLabel)).toEqual('My First Name');

          context.push();
          context.set('operation', 'create');
          expect(context.propertyForKey(KeyLabel))
            .toEqual('Enter your first Name');
          context.pop();

          context.pop();
          context.pop();
        }
      );

      /**
       * class=UserProfile {
                    field=userId {
                        label:'User Id';
                    }
                    field=firstName#required {
                        label:'You First Name';
                    }
                    field=lastName#required {
                        label:'You Last Name';
                    }
                    field=age {
                        label:'Age';
                    }
                    field=note {
                        label:'Info About User';
                    }
                    @field=fullName {
                        trait:derived;
                        label:'Full Name';
                        type:String;
                        value: ${object.firstName + ' ' + object.lastName };
                    }
                    @field=extraInfo {
                        trait:derived;
                        label:'Warning';
                        type:String;
                        value: 'This user is too young !!';
                        visible:${ object.age < 18}
                    }
                    operation=edit {
                        field {
                            after:zNone;
                        }
                        field=(firstName, lastName, age, note, fullName) {
                            after:zLeft;
                        }
                    }
                    operation=view {
                        field {
                            after:zNone
                        }
                        field=(userId, firstName, lastName, age, note, fullName, extraInfo) {
                            after:zLeft
                        }
                   }
            }
       class=UserProfile role=admin {
                operation=(edit, view) {
                        field {
                            after:zNone;
                        }
                        field=(userId, firstName, lastName, age, note, fullName, extraInfo,
                        password, locale,
                        lastAccessTime) {
                            after:zLeft;
                        }
                    }
            }
       */
      it(' it should resolve for edit operation 5 fields in zNone and 5 fields in zLeft so ' +
        'that it matches above ' +
        'rule, but once we push it role=admin we should see all the fields', () => {

          const metaUI: MetaRules = TestBed.get(META_RULES);
          metaUI.addTestUserRule('UserProfileTeRule', UserProfileTestRule);

          let context = metaUI.newContext();


          context.push();
          context.set('layout', 'Inspect');
          context.set('operation', 'edit');
          context.set('object',
            new UserProfileTe('U123', 'Frank', 'Kolar', 16,
              'From Czech Republic', 'pasw', 'asdf', '11'));
          context.setScopeKey('class');

          let mapp = context.propertyForKey(PropFieldsByZone);

          expect(mapp.size).toEqual(2);

          let zLeft = mapp.get('zLeft');
          let zNone = mapp.get('zNone');

          expect(zLeft.length).toEqual(5);
          expect(zNone.length).toEqual(5);

          context.pop();

          context = metaUI.newContext();

          context.push();
          context.set('layout', 'Inspect');
          context.set('role', 'admin');
          context.set('operation', 'edit');
          context.set('object',
            new UserProfileTe('U123', 'Frank', 'Kolar', 16, 'From Czech Republic',
              'pasw', 'asdf', '11'));
          context.setScopeKey('class');

          mapp = context.propertyForKey(PropFieldsByZone);

          expect(mapp.size).toEqual(1);

          zLeft = mapp.get('zLeft');
          zNone = mapp.get('zNone');

          expect(zLeft.length).toEqual(10);
          expect(zNone).not.toBeDefined();
          context.pop();


          context = metaUI.newContext();
          context.push();
          context.set('role', 'admin');
          context.set('layout', 'Inspect');
          context.set('operation', 'edit');
          context.set('object',
            new UserProfileTe('U123', 'Frank', 'Kolar', 16, 'From Czech Republic',
              'pasw', 'asdf', '11'));
          context.setScopeKey('class');

          mapp = context.propertyForKey(PropFieldsByZone);

          expect(mapp.size).toEqual(1);

          zLeft = mapp.get('zLeft');
          zNone = mapp.get('zNone');

          expect(zLeft.length).toEqual(10);
          expect(zNone).not.toBeDefined();

          context.pop();

          context = metaUI.newContext();
          context.push();
          context.set('layout', 'Inspect');
          context.set('operation', 'edit');
          context.set('object',
            new UserProfileTe('U123', 'Frank', 'Kolar', 16, 'From Czech Republic',
              'pasw', 'asdf', '11'));
          context.setScopeKey('class');
          context.set('role', 'admin');

          mapp = context.propertyForKey(PropFieldsByZone);

          expect(mapp.size).toEqual(1);

          zLeft = mapp.get('zLeft');
          zNone = mapp.get('zNone');

          expect(zLeft.length).toEqual(10);
          expect(zNone).not.toBeDefined();

          context.pop();


          context = metaUI.newContext();
          context.push();
          context.set('layout', 'Inspect');
          context.set('operation', 'view');
          context.set('object',
            new UserProfileTe('U123', 'Frank', 'Kolar', 16, 'From Czech Republic',
              'pasw', 'asdf', '11'));
          context.setScopeKey('class');
          context.set('role', 'admin');

          mapp = context.propertyForKey(PropFieldsByZone);

          expect(mapp.size).toEqual(1);

          zLeft = mapp.get('zLeft');
          zNone = mapp.get('zNone');

          expect(zLeft.length).toEqual(10);
          expect(zNone).not.toBeDefined();

          context.pop();

        }
      );


      /**
       class=UserProfile role=admin {
                operation=(edit, view) {
                        field {
                            after:zNone;
                        }
                        field=(userId, firstName, lastName, age, note, fullName, extraInfo,
                        password, locale,
                        lastAccessTime) {
                            after:zLeft;
                        }
                    }
            }
       */
      it('it should not match top level selectors extending a class=xxx for class=xxx ' +
        'role=admin no earlier ' +
        'then after settings a objects', () => {

          const metaUI: MetaRules = TestBed.get(META_RULES);
          metaUI.addTestUserRule('UserProfileTeRule', UserProfileTestRule);

          const context = metaUI.newContext();


          context.push();


          context.set('layout', 'Inspect');
          context.set('operation', 'edit');
          context.set('role', 'admin');
          context.set('object',
            new UserProfileTe('U123', 'Frank', 'Kolar', 16, 'From Czech Republic',
              'pasw', 'asdf', '11'));
          context.setScopeKey('class');


          const mapp = context.propertyForKey(PropFieldsByZone);

          expect(mapp.size).toEqual(2);

          const zLeft = mapp.get('zLeft');
          const zNone = mapp.get('zNone');

          expect(zLeft.length).toEqual(5);
          expect(zNone.length).toEqual(5);

          context.pop();

        }
      );


      /**
       class=UserProfile role=admin {
                operation=(edit, view) {
                        field {
                            after:zNone;
                        }
                        field=(userId, firstName, lastName, age, note, fullName, extraInfo,
                         password,
                        locale, lastAccessTime) {
                            after:zLeft;
                        }
                    }
            }
       */
      it('it should match top level selectors extending a class=xxx for class=xxx ' +
        'role=admin ' + 'no earlier then after settings a objects', () => {

          const metaUI: MetaRules = TestBed.get(META_RULES);
          metaUI.addTestUserRule('UserProfileTeRule', UserProfileTestRule);

          const context = metaUI.newContext();


          context.push();


          context.set('layout', 'Inspect');
          context.set('operation', 'edit');
          context.set('object',
            new UserProfileTe('U123', 'Frank', 'Kolar', 16, 'From Czech Republic',
              'pasw', 'asdf', '11'));
          context.set('role', 'admin');
          context.setScopeKey('class');


          const mapp = context.propertyForKey(PropFieldsByZone);

          expect(mapp.size).toEqual(1);

          const zLeft = mapp.get('zLeft');
          const zNone = mapp.get('zNone');

          expect(zLeft.length).toEqual(10);
          expect(zLeft.length).toEqual(10);
          expect(zNone).not.toBeDefined();

          context.pop();


        }
      );


    });


  describe('basic expression resolution and the way how we can handle dynamic fields which are ' +
    'resolve just before we render the field. as well as how we can distribute fields ' +
    'into different zones', () => {


    it('It should resolve dynamic validity condition ${ value > 19}  so that it can give ' +
      'info back if the field is valid', () => {

        const metaUI: MetaRules = TestBed.get(META_RULES);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const context: UIContext = <UIContext> metaUI.newContext();

        context.push();
        context.set('layout', 'Inspect');
        context.set('operation', 'edit');
        context.set('object',
          new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic'));
        context.setScopeKey('class');

        context.push();
        context.set('field', 'age');
        expect(context.propertyForKey(KeyValid)).toBeFalsy();
        context.pop();

        context.push();
        context.object.age = 20;

        context.set('field', 'age');
        expect(context.propertyForKey(KeyValid)).toBeTruthy();
        context.pop();


        context.pop();
      }
    );


    it('It should resolve visiblity condition that depends on the value of other fields so ' +
      'that it check the field AGE ${object.age > 18}', () => {

        const metaUI: MetaRules = TestBed.get(META_RULES);
        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const context: UIContext = <UIContext> metaUI.newContext();

        context.push();
        context.set('layout', 'Inspect');
        context.set('operation', 'edit');
        context.set('object',
          new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic'));
        context.setScopeKey('class');

        context.push();
        context.set('field', 'bio');
        expect(context.propertyForKey(KeyVisible)).toBeFalsy();
        context.pop();

        context.push();
        context.object.age = 20;

        context.set('field', 'bio');
        expect(context.propertyForKey(KeyVisible)).toBeTruthy();
        context.pop();


        context.pop();
      }
    );


    it(' it should be able to translate a className to the page title so it resolve our ' +
      'page title ', () => {

        const metaUI: MetaRules = TestBed.get(META_RULES);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClassRule);

        const context: UIContext = <UIContext> metaUI.newContext();

        context.push();
        context.set('layout', 'Inspect');
        context.set('operation', 'edit');
        context.set('object',
          new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic'));
        context.setScopeKey('class');

        const title = context.propertyForKey('objectTitle');
        expect(title).toEqual('My User Test Class');

        context.pop();
      }
    );


    /**
     *   operation=view {
     *          @field=bioView {
     *              type=String;
     *              visible: ${ object.bio.length > 15 };
     *              value: ${object.bio.substring(0, 10) + '...'};
     *              after:age;
     *          }
     *    }
     */
    it('It should resolve a context field paths that is attached to custom derived field ' +
      'concatenates result form 2 other fields. value:' +
      ' ${object.bio.substring(0, 10) + ... };', () => {

        const metaUI: MetaRules = TestBed.get(META_RULES);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClas2sRule);
        const context = metaUI.newContext();


        context.push();
        context.set('layout', 'Inspect');
        context.set('operation', 'view');
        context.set('object',
          new MyUserTestClass('Frank', 'Kolar', 16, 'Country: From Czech Republic, ' +
            'City:Prague'));
        context.setScopeKey('class');


        context.push();
        context.set('field', 'bioView');

        expect(context.propertyForKey(KeyValue)).toEqual('Country: F...');
        context.pop();


        context.pop();
      }
    );


    /**
     *   operation=view {
     *          @field=bioView {
     *              type=String;
     *              visible: ${ object.bio.length > 15 };
     *              value: ${object.bio.substring(0, 10) + '...'};
     *              after:age;
     *          }
     *    }
     */
    it(' a bioView should be visible only if bio field len is more then 15 and only in ' +
      'view mode', () => {

        const metaUI: MetaRules = TestBed.get(META_RULES);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClas2sRule);
        const context: UIContext = <UIContext> metaUI.newContext();


        context.push();
        context.set('layout', 'Inspect');
        context.set('operation', 'view');
        context.set('object',
          new MyUserTestClass('Frank', 'Kolar', 16, 'Country: From Czech Republic, ' +
            'City:Prague'));
        context.setScopeKey('class');

        context.push();
        context.set('field', 'bioView');
        expect(context.propertyForKey(KeyVisible)).toBeTruthy();
        context.pop();


        context.push();
        context.object.bio = 'This short Bio';

        context.set('field', 'bioView');
        expect(context.propertyForKey(KeyVisible)).toBeFalsy();
        context.pop();

        context.pop();
      }
    );

    it('It should resolve all the field that belongs to current class MyUserTestClass for ' +
      'operation EDIT', () => {

        const metaUI: MetaRules = TestBed.get(META_RULES);

        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClas2sRule);
        const context = metaUI.newContext();


        context.push();
        context.set('layout', 'Inspect');
        context.set('operation', 'edit');
        context.set('object',
          new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic'));
        context.setScopeKey('class');


        const field = metaUI.itemNames(context, 'field');

        expect(field.length).toEqual(4);
        expect(field[0]).toEqual('firstName');
        expect(field[1]).toEqual('lastName');
        expect(field[2]).toEqual('age');
        expect(field[3]).toEqual('bio');

        context.pop();
      }
    );


    it('It should resolve all the field that belongs to current class MyUserTestClass VIEW ' +
      'so that we will get 5 fields as 1 is derived', () => {

        const metaUI: MetaRules = TestBed.get(META_RULES);
        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClas2sRule);
        const context = metaUI.newContext();


        context.push();
        context.set('layout', 'Inspect');
        context.set('operation', 'view');
        context.set('object',
          new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic'));
        context.setScopeKey('class');


        const field = metaUI.itemNames(context, 'field');
        // print(field);

        expect(field.length).toEqual(5);
        expect(field[0]).toEqual('firstName');
        expect(field[1]).toEqual('lastName');
        expect(field[2]).toEqual('age');
        expect(field[3]).toEqual('bio');
        expect(field[4]).toEqual('bioView');

        context.pop();
      }
    );


    it('It should resolve all the VISIBILE fields that belongs to current class for view ' +
      'operations VIEW', () => {

        const metaUI: MetaRules = TestBed.get(META_RULES);
        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClas2sRule);
        const context = metaUI.newContext();


        context.push();
        context.set('layout', 'Inspect');
        context.set('operation', 'view');
        context.set('object',
          new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic'));
        context.setScopeKey('class');


        const byZone = context.propertyForKey(PropFieldsByZone);
        expect(byZone.has('zLeft')).toBeTruthy();


        const expResult: Map<string, boolean> = new Map<string, boolean>().set(
          'firstName', true)
          .set('lastName',
            true).set('age', true).set('bio', false).set('bioView', true);

        const fields = byZone.get('zLeft');

        for (const fieldName of fields) {
          context.push();
          context.set('field', fieldName);
          const visible = context.propertyForKey(KeyVisible);
          expect(expResult.get(fieldName)).toEqual(visible);

          context.pop();
        }

        context.pop();
      }
    );


    /**
     *
     * We expect 3 zones zTop, zLeft, z Bottom based on the following rule:
     *
     *
     *         zNone => *;
     *         zLeft => lastName => age => bio;
     *         zTop => firstName;
     *         zBottom => bioView;
     *
     */
    it('It should resolve our fields into 3 different zones zTop = firstName, ' +
      'zLeft=lastName,age, bio, zBottom=bioView ignoring their visibility properties', () => {


        const metaUI: MetaRules = TestBed.get(META_RULES);
        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClasForZonesRule);
        const context = metaUI.newContext();


        context.push();
        context.set('operation', 'view');
        context.set('layout', 'Inspect');
        context.set('object',
          new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic'));
        context.setScopeKey('class');


        const byZone = context.propertyForKey(PropFieldsByZone);
        expect(byZone.has('zLeft')).toBeTruthy();
        expect(byZone.has('zTop')).toBeTruthy();
        expect(byZone.has('zBottom')).toBeTruthy();


        const fieldsL = byZone.get('zLeft');
        const fieldsT = byZone.get('zTop');
        const fieldsB = byZone.get('zBottom');


        expect(fieldsL.length).toBe(3);
        expect(fieldsT.length).toBe(1);
        expect(fieldsB.length).toBe(1);

        // check also order of each fields
        expect(fieldsL[0]).toEqual('lastName');
        expect(fieldsL[1]).toEqual('age');
        expect(fieldsL[2]).toEqual('bio');

        expect(fieldsT[0]).toEqual('firstName');

        expect(fieldsB[0]).toEqual('bioView');

        context.pop();
      }
    );

    it('It should resolve our fields in the real UserProfile object where we will see zLeft ' +
      'fields', () => {


        const metaUI: MetaRules = TestBed.get(META_RULES);
        metaUI.addTestUserRule('UserProfileTeRule', UserProfileTestRule);


        const context = metaUI.newContext();

        context.push();
        context.set('layout', 'Inspect');
        context.set('operation', 'edit');
        context.set('object',
          new UserProfileTe('123', 'a', 'b', 213, 'adsfas asdfas adf'));
        context.setScopeKey('class');


        const byZone = context.propertyForKey(PropFieldsByZone);
        expect(byZone.has('zLeft')).toBeTruthy();

        const zLeft = byZone.get('zLeft');
        expect(zLeft.length).toEqual(5);

        context.pop();
      }
    );


    it('It should read bindings and resolve their dynamic values wher when we ask for ' +
      'userId we expect 123',
      () => {

        const metaUI: MetaRules = TestBed.get(META_RULES);
        metaUI.addTestUserRule('UserProfileTeRule', UserProfileTestRule);


        const context = metaUI.newContext();

        context.push();
        context.set('layout', 'Inspect');
        context.set('operation', 'edit');
        context.set('object',
          new UserProfileTe('123', 'a', 'b', 213, 'adsfas asdfas adf'));
        context.setScopeKey('class');


        context.push();
        context.set('field', 'userId');


        const bindings = context.propertyForKey(KeyBindings);
        // print(bindings.size);


        const value: ContextFieldPath = bindings.get('value');
        expect(value.evaluate(context)).toEqual('123');


        context.pop();
        context.pop();
      }
    );

    it('it should automatically resolve a field label if not specified. All this by ' +
      'decamelizing its Field', () => {

        const metaUI: MetaRules = TestBed.get(META_RULES);
        metaUI.addTestUserRule('MyUserTestClassRule', MyUserTestClas2sRule);
        const context = metaUI.newContext();


        context.push();
        context.set('layout', 'Inspect');
        context.set('operation', 'view');
        context.set('object',
          new MyUserTestClass('Frank', 'Kolar', 16, 'From Czech Republic'));
        context.setScopeKey('class');


        context.push();
        // bioView does not have any label but check if we can figure out correct one.
        context.set('field', 'bioView');
        expect(context.propertyForKey(KeyLabel)).toEqual('Bio View');

        context.pop();


        context.pop();
      }
    );

  });


  describe('how components are rendered using dynamic values', () => {
    let compWrapper: TestContainerComponent;
    let compChild: SFComponent;

    let fixtureWrapper: ComponentFixture<TestContainerComponent>;
    let fixtureChild: ComponentFixture<SFComponent>;
    let compNativeElement: DebugElement;


    beforeEach(() => {
      Object.defineProperty(SFComponent.prototype, 'title', {

        get: () => {
          return this.title + '-patched';
        },

        set: (value) => {
          this.title = value;
        },
        enumerable: true,
        configurable: true
      });

      fixtureWrapper = TestBed.createComponent(TestContainerComponent);
      fixtureChild = TestBed.createComponent(SFComponent);


      fixtureWrapper.detectChanges();
      compWrapper = fixtureWrapper.componentInstance;
      compChild = fixtureChild.componentInstance;

      // get title DebugElement by element name
      compNativeElement = fixtureWrapper.debugElement.query(By.css('span'));

    });

    it('It should display a simple text San Franscisco', () => {
      fixtureWrapper.detectChanges();
      expect(compNativeElement.nativeElement.textContent).toContain('San Francisco');
    });


    it('It should change a behavior of the @Input() field so that it uses some patched on ' +
      'the fly created getter' +
      ' and setter to retrive a computed value', () => {

      fixtureWrapper.detectChanges();
      expect(compNativeElement.nativeElement.textContent).toContain('San Francisco-patched');
    });

  });


  describe('=> Concurency of MetaUI ', () => {


    xit('should process more then 800 000 rule index entries in less than 2 sec', () => {


      const metaPefr: MetaRules = TestBed.get(META_RULES);

      metaPefr.componentRegistry.registerType('MyUserTestClass', MyUserTestClass);

      metaPefr.addTestUserRule('MyUserTestClassRule', MyUserTestClas2sRule);

      const start = Date.now();

      for (let i = 0; i < 1000; i++) {
        const context = metaPefr.newContext();
        context.push();

        // console.log('#### ################ activation #', i)
        context.set('layout', 'Inspect');
        context.set('operation', 'edit');
        context.set('class', 'MyUserTestClass');

        context.push();
        context.set('field', 'age');
        expect(context.propertyForKey(KeyLabel)).toEqual('My Age');

        context.push();
        context.set('operation', 'view');
        expect(context.propertyForKey(KeyLabel)).toEqual('Age Label For View');
        context.pop();

        context.pop();
        context.pop();
      }

      const processedIn = Date.now() - start;

      expect(processedIn).toBeLessThan(5000);
      expect(Match._Debug_ElementProcessCount).toBeGreaterThan(800000);

      // console.log('Rule index entries processed:', Match._Debug_ElementProcessCount)
      // console.log('Processed in:',  processedIn);
    });
  });


  /**
   *
   * This test is based on following oss
   *
   *        class=UserWithDetail {
   *
   *            field=name {
   *                trait:asHover;
   *                label:"Frank Kolar";
   *            }
   *        }
   */

  describe('how class can get object details ', () => {


    it('should retrieve correct component to render when trait asHover is used and' +
      ' overriden by user rules', () => {

      const metaUI: MetaRules = TestBed.get(META_RULES);

      metaUI.addTestUserRule('UserWithDetailRule', UserWithDetailRule);
      const context = metaUI.newContext();

      context.push();
      context.set('layout', 'Inspect');
      context.set('operation', 'view');
      context.set('object', new UserWithDetail('Frank Kolar'));
      context.setScopeKey('class');

      context.push();
      context.set('field', 'name');

      expect(context.propertyForKey('component')).toBe('HoverCardComponent');
      const bindings = context.propertyForKey('bindings');

      context.push();
      context.set('layout', bindings.get('ngcontentLayout'));
      expect(context.propertyForKey('component')).toBe('NewStringComponent');

      context.pop();


      context.pop();
      context.pop();
    });
  });
});


/**
 *
 * Almost identical like above case , here we just distribute fields into different ZONES
 *
 *  class=MyUserTestClass {
 *
 *		field=firstName#required {
 *				label:'My First Name';
 *
 *				operation=create {
 *					label:'Enter your first Name';
 *				}
 *			}
 *
 *			field=lastName#required {
 *				label:'My Last Name';
 *			}
 *
 *			field=age#required {
 *				label:'My Age';
 *				valid: ${value > 19};
 *
 *				operation=view {
 *					label:'Age Label For View';
 *				}
 *			}
 *
 *			field=bio {
 *				label:'This is my biography';
 *				visible:${object.age > 18};
 *
 *				operation=view {
 *					after:zNone;
 *				}
 *
 *			}
 *
 *			zNone => *;
 *			zLeft => lastName => age => bio;
 *			zTop => firstName;
 *
 *			operation=view {
 *            @field=bioView {
 *   		       type=String;
 *					visible: ${ object.bio.length > 15 };
 *					value: ${object.bio.substring(0, 10) + '...'};
 *    		        after:zBottom;
 *				}
 *         }
 * }
 *
 * Map format bellow:
 *
 */


// @formatter:off
/**
 *
 *
 *
 *       class=MyUserTestClass {
 *
 *            field=firstName#required {
 *                label:'My First Name';
 *            }
 *
 *            field=lastName#required {
 *                label:'My Last Name';
 *           }
 *
 *            field=age#required {
 *                label:'My Age';
 *               valid: ${value > 19};
 *          }
 *
 *            field=bio {
 *                label:'This is my biography';
 *                visible:${object.age > 18};
 *            }
 *
 *            zNone => *;
 *            zLeft => firstName => lastName => age => bio;
 *        }
 *
 *
 */

/* tslint:disable */

export const MyUserTestClassRule = {
  oss: [
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    },
    {
      '_properties': {'trait': 'required', 'label': 'My First Name'}, '_rank': 0,
      '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'firstName', '_key': 'field'}
      ]
    },
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    },
    {
      '_properties': {'trait': 'required', 'label': 'My Last Name'}, '_rank': 0,
      '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'lastName', '_key': 'field'}
      ]
    },
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    },
    {
      '_properties': {
        'valid': {'t': 'Expr', 'v': 'value > 19'},
        'trait': 'required',
        'label': 'My Age'
      },
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'age', '_key': 'field'}
      ]
    },
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    },
    {
      '_properties': {
        'visible': {'t': 'Expr', 'v': 'object.age > 18'},
        'label': 'This is my biography'
      },
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'bio', '_key': 'field'}
      ]
    },
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    },
    {
      '_properties': {'after': 'zNone'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': '*', '_key': 'field'}
      ]
    },
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    },
    {
      '_properties': {'after': 'zLeft'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'firstName', '_key': 'field'}
      ]
    },
    {
      '_properties': {'after': 'firstName'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'lastName', '_key': 'field'}
      ]
    },
    {
      '_properties': {'after': 'lastName'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'age', '_key': 'field'}
      ]
    },
    {
      '_properties': {'after': 'age'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'bio', '_key': 'field'}
      ]
    },
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }
  ]
};
// @formatter:on
/* tslint:enable */


/**
 *  class=MyUserTestClass {
 *
 *		field=firstName#required {
 *				label:'My First Name';
 *
 *				operation=create {
 *					label:'Enter your first Name';
 *				}
 *			}
 *
 *			field=lastName#required {
 *				label:'My Last Name';
 *			}
 *
 *			field=age#required {
 *				label:'My Age';
 *				valid: ${value > 19};
 *
 *				operation=view {
 *					label:'Age Label For View';
 *				}
 *			}
 *
 *			field=bio {
 *				label:'This is my biography';
 *				visible:${object.age > 18};
 *
 *				operation=view {
 *					after:zNone;
 *				}
 *
 *			}
 *
 *			zNone => *;
 *			zLeft => firstName => lastName => age => bio;
 *
 *			operation=view {
 *            @field=bioView {
 *   		       type=String;
 *					visible: ${ object.bio.length > 15 };
 *					value: ${object.bio.substring(0, 10) + '...'};
 *    		        after:age;
 *				}
 *         }
 * }
 *
 * Map format bellow:
 *
 */
/* tslint:disable */

// @formatter:off
export const MyUserTestClas2sRule = {
  oss: [
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }, {
      '_properties': {'trait': 'required', 'label': 'My First Name'}, '_rank': 0,
      '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'firstName', '_key': 'field'}
      ]
    }, {
      '_properties': {'label': 'Enter your first Name'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'firstName', '_key': 'field'},
        {'_isDecl': false, '_value': 'create', '_key': 'operation'}
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'firstName', '_key': 'field'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }, {
      '_properties': {'trait': 'required', 'label': 'My Last Name'}, '_rank': 0,
      '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'lastName', '_key': 'field'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }, {
      '_properties': {
        'valid': {'t': 'Expr', 'v': 'value > 19'},
        'trait': 'required',
        'label': 'My Age'
      },
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'age', '_key': 'field'}
      ]
    }, {
      '_properties': {'label': 'Age Label For View'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'age', '_key': 'field'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'}
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'age', '_key': 'field'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }, {
      '_properties': {
        'visible': {'t': 'Expr', 'v': 'object.age > 18'},
        'label': 'This is my biography'
      },
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'bio', '_key': 'field'}
      ]
    }, {
      '_properties': {'after': 'zNone'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'bio', '_key': 'field'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'}
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'bio', '_key': 'field'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }, {
      '_properties': {'after': 'zNone'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': '*', '_key': 'field'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }, {
      '_properties': {'after': 'zLeft'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'firstName', '_key': 'field'}
      ]
    }, {
      '_properties': {'after': 'firstName'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'lastName', '_key': 'field'}
      ]
    }, {
      '_properties': {'after': 'lastName'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'age', '_key': 'field'}
      ]
    }, {
      '_properties': {'after': 'age'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'bio', '_key': 'field'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'}
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'},
        {'_isDecl': true, '_value': 'bioView', '_key': 'field'}
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'},
        {'_isDecl': true, '_value': 'bioView', '_key': 'field'},
        {'_isDecl': false, '_value': 'String', '_key': 'type'}
      ]
    }, {
      '_properties': {
        'visible': {'t': 'Expr', 'v': 'object.bio.length > 15'}, 'after': 'age',
        'value': {'t': 'Expr', 'v': 'object.bio.substring(0, 10) + \'...\''}
      }, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'},
        {'_isDecl': true, '_value': 'bioView', '_key': 'field'}
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }
  ]
};
/* tslint:enable */

/* tslint:disable */

export const MyUserTestClasForZonesRule = {
  oss: [
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }, {
      '_properties': {'trait': 'required', 'label': 'My First Name'}, '_rank': 0,
      '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'firstName', '_key': 'field'}
      ]
    }, {
      '_properties': {'label': 'Enter your first Name'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'firstName', '_key': 'field'},
        {'_isDecl': false, '_value': 'create', '_key': 'operation'}
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'firstName', '_key': 'field'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }, {
      '_properties': {'trait': 'required', 'label': 'My Last Name'}, '_rank': 0,
      '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'lastName', '_key': 'field'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }, {
      '_properties': {
        'valid': {'t': 'Expr', 'v': 'value > 19'},
        'trait': 'required',
        'label': 'My Age'
      },
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'age', '_key': 'field'}
      ]
    }, {
      '_properties': {'label': 'Age Label For View'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'age', '_key': 'field'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'}
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'age', '_key': 'field'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }, {
      '_properties': {
        'visible': {'t': 'Expr', 'v': 'object.age > 18'},
        'label': 'This is my biography'
      },
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'bio', '_key': 'field'}
      ]
    }, {
      '_properties': {'after': 'zNone'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'bio', '_key': 'field'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'}
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'bio', '_key': 'field'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }, {
      '_properties': {'after': 'zNone'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': '*', '_key': 'field'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }, {
      '_properties': {'after': 'zLeft'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'lastName', '_key': 'field'}
      ]
    }, {
      '_properties': {'after': 'lastName'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'age', '_key': 'field'}
      ]
    }, {
      '_properties': {'after': 'age'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'bio', '_key': 'field'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }, {
      '_properties': {'after': 'zTop'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'firstName', '_key': 'field'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'}
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'},
        {'_isDecl': true, '_value': 'bioView', '_key': 'field'}
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'},
        {'_isDecl': true, '_value': 'bioView', '_key': 'field'},
        {'_isDecl': false, '_value': 'String', '_key': 'type'}
      ]
    }, {
      '_properties': {
        'visible': {'t': 'Expr', 'v': 'object.bio.length > 15'}, 'after': 'zBottom',
        'value': {'t': 'Expr', 'v': 'object.bio.substring(0, 10) + \'...\''}
      }, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'},
        {'_isDecl': true, '_value': 'bioView', '_key': 'field'}
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'}
      ]
    }, {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'MyUserTestClass', '_key': 'class'}]
    }
  ]
};

export const UserProfileTestRule = {
  oss: [
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'}]
    },
    {
      '_properties': {'label': 'User Id'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'userId', '_key': 'field'}
      ]
    },
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'}]
    },
    {
      '_properties': {'trait': 'required', 'label': 'You First Name'}, '_rank': 0,
      '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'firstName', '_key': 'field'}
      ]
    },
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'}]
    },
    {
      '_properties': {'trait': 'required', 'label': 'You Last Name'}, '_rank': 0,
      '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'lastName', '_key': 'field'}
      ]
    },
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'}]
    },
    {
      '_properties': {'label': 'Age'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'age', '_key': 'field'}
      ]
    },
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'}]
    },
    {
      '_properties': {'label': 'Info About User'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'note', '_key': 'field'}
      ]
    },
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'}]
    },
    {
      '_properties': {
        'trait': 'derived', 'label': 'Full Name', 'type': 'String',
        'value': {'t': 'Expr', 'v': 'object.firstName + " "+ object.lastName'}
      }, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': true, '_value': 'fullName', '_key': 'field'}
      ]
    },
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'}]
    },
    {
      '_properties': {
        'visible': {'t': 'Expr', 'v': 'object.age < 18'}, 'trait': 'derived',
        'label': 'Warning',
        'type': 'String', 'value': 'This user is too young !!'
      }, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': true, '_value': 'extraInfo', '_key': 'field'}
      ]
    },
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'}]
    },
    {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'edit', '_key': 'operation'}
      ]
    }, {
      '_properties': {'after': 'zNone'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'edit', '_key': 'operation'},
        {'_isDecl': false, '_value': '*', '_key': 'field'}
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'edit', '_key': 'operation'}
      ]
    }, {
      '_properties': {'after': 'zLeft'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'edit', '_key': 'operation'},
        {
          '_isDecl': false,
          '_value': ['firstName', 'lastName', 'age', 'note', 'fullName'],
          '_key': 'field'
        }
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'edit', '_key': 'operation'}
      ]
    },
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'}]
    },
    {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'}
      ]
    }, {
      '_properties': {'after': 'zNone'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'},
        {'_isDecl': false, '_value': '*', '_key': 'field'}
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'}
      ]
    }, {
      '_properties': {'after': 'zLeft'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'}, {
          '_isDecl': false,
          '_value': [
            'userId', 'firstName', 'lastName', 'age', 'note', 'fullName', 'extraInfo'
          ],
          '_key': 'field'
        }
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'view', '_key': 'operation'}
      ]
    },
    {
      '_rank': 0,
      '_selectors': [{'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'}]
    },
    {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'admin', '_key': 'role'}
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'admin', '_key': 'role'},
        {'_isDecl': false, '_value': ['edit', 'view'], '_key': 'operation'}
      ]
    }, {
      '_properties': {'after': 'zNone'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'admin', '_key': 'role'},
        {'_isDecl': false, '_value': ['edit', 'view'], '_key': 'operation'},
        {'_isDecl': false, '_value': '*', '_key': 'field'}
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'admin', '_key': 'role'},
        {'_isDecl': false, '_value': ['edit', 'view'], '_key': 'operation'}
      ]
    }, {
      '_properties': {'after': 'zLeft'}, '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'admin', '_key': 'role'},
        {'_isDecl': false, '_value': ['edit', 'view'], '_key': 'operation'}, {
          '_isDecl': false, '_value': [
            'userId', 'firstName', 'lastName', 'age', 'note', 'fullName', 'extraInfo',
            'password', 'locale',
            'lastAccessTime'
          ], '_key': 'field'
        }
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'admin', '_key': 'role'},
        {'_isDecl': false, '_value': ['edit', 'view'], '_key': 'operation'}
      ]
    }, {
      '_rank': 0, '_selectors': [
        {'_isDecl': false, '_value': 'UserProfileTe', '_key': 'class'},
        {'_isDecl': false, '_value': 'admin', '_key': 'role'}
      ]
    }
  ]
};


export const UserWithDetailRule = {
  oss: [
    {
      '_selectors': [
        {
          '_key': 'class',
          '_value': 'UserWithDetail',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'class',
          '_value': 'UserWithDetail',
          '_isDecl': false
        },
        {
          '_key': 'field',
          '_value': 'name',
          '_isDecl': false
        }
      ],
      '_properties': {
        'trait': 'asHover',
        'label': 'Frank Kolar'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'class',
          '_value': 'UserWithDetail',
          '_isDecl': false
        },
        {
          '_key': 'field',
          '_value': 'name',
          '_isDecl': false
        },
        {
          '_key': 'layout',
          '_value': 'Content',
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'NewStringComponent'
      },
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'class',
          '_value': 'UserWithDetail',
          '_isDecl': false
        },
        {
          '_key': 'field',
          '_value': 'name',
          '_isDecl': false
        }
      ],
      '_rank': 0
    },
    {
      '_selectors': [
        {
          '_key': 'class',
          '_value': 'UserWithDetail',
          '_isDecl': false
        }
      ],
      '_rank': 0
    }
  ]
};

/* tslint:enable */


class MyUserTestClass implements Entity {
  firstName: string;
  lastName: string;
  age: number;
  bio: string;


  constructor(firstName: string, lastName: string, age: number, bio: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.bio = bio;
  }

  identity(): string {
    return this.lastName;
  }

  className(): string {
    return 'MyUserTestClass';
  }

  getTypes(): any {
    return {
      firstName: String,
      lastName: String,
      age: Number,
      bio: String
    };
  }
}


@Component({
  selector: 'wrapper-comp',
  template: '<test-comp [title]="text"></test-comp>'
})
class TestContainerComponent {
  text = 'San Francisco';
}


@Component({
  selector: 'test-comp',
  template: '<span>{{title}}</span>'
})
class SFComponent {
  @Input()
  title: string = 'Prague';

}


export class UserProfileTe implements Entity {

  constructor(public userId: string, public  firstName: string, public  lastName: string,
              public  age: number,
              public note: string, public password: string = '', public locale: string = '',
              public lastAccessTime = '') {

  }

  identity(): string {
    return this.userId;
  }

  className(): string {
    return 'UserProfileTe';
  }

  getTypes(): any {
    return {
      userId: String,
      firstName: String,
      lastName: String,
      age: Number,
      note: String,
      password: String,
      locale: String,
      lastAccessTime: String
    };
  }
}


class UserWithDetail implements Entity {

  constructor(public name: string) {
  }

  identity(): string {
    return this.name;
  }

  className(): string {
    return 'UserWithDetail';
  }

  getTypes(): any {
    return {
      name: String
    };
  }
}
