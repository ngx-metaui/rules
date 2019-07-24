/**
 *  This is generated file. Do not edit !!
 *
 *  @formatter:off
 *
 */
/* tslint:disable */
export const SystemPersistenceRules = {
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
          '_key': 'trait',
          '_value': 'toOneRelationship',
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
          '_value': 'toOneRelationship',
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
          'object': {
            't': 'Expr',
            'v': 'object'
          },
          'key': {
            't': 'Expr',
            'v': 'field'
          },
          'destinationClass': {
            't': 'Expr',
            'v': 'elementType'
          },
          'multiselect': false,
          'type': 'Dropdown',
          'displayKey': {
            't': 'Expr',
            'v': 'meta.displayLabel(type, properties.get("labelField"))'
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
          '_value': 'toOneRelationship',
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
          '_key': 'trait',
          '_value': 'toManyChooser',
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
          '_value': 'toManyChooser',
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
          'object': {
            't': 'Expr',
            'v': 'object'
          },
          'key': {
            't': 'Expr',
            'v': 'field'
          },
          'destinationClass': {
            't': 'Expr',
            'v': 'elementType'
          },
          'multiselect': true,
          'type': 'Chooser',
          'displayKey': {
            't': 'Expr',
            'v': 'meta.displayLabel(type, properties.get("labelField"))'
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
          '_value': 'toManyChooser',
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
          '_key': 'trait',
          '_value': 'toManyLink',
          '_isDecl': false
        }
      ],
      '_properties': {
        'component': 'AWHyperlink',
        'bindings': {
          'action': {
            't': 'Expr',
            'v': 'set("object", value), set("actionCategory", "General"), set("action", "Inspect"), meta.fireAction(this, requestContext)'
          },
          'omitTags': {
            't': 'Expr',
            'v': '!value || value.size()==0'
          },
          'ngcontent': {
            't': 'Expr',
            'v': 'value ? ("" + value.size() + " items") : "(none)"'
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
          '_key': 'action',
          '_value': 'Inspect',
          '_isDecl': false
        }
      ],
      '_properties': {
        'visible': true,
        'trait': 'pageAction',
        'pageName': 'MetaContentPageComponent',
        'pageBindings': {
          'object': {
            't': 'Expr',
            'v': 'object'
          },
          'operation': 'view',
          'layout': 'Inspect',
          'clientPanel': true
        }
      },
      '_rank': 0
    }
  ]
};

/* tslint:disable */
/**
 *  @formatter:on
 *
 */
